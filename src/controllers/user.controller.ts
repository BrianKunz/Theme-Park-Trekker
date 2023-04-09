import express from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User.entity";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../authorization/authenticate";

const userController = express.Router();

// Create user
userController.post("/", async (req, res) => {
  const { username, email, password, admin } = req.body;

  try {
    const user = new User();
    user.username = username;
    user.email = email;
    await user.setPassword(password);
    user.admin = admin;

    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Login user
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      res.status(401).json("Invalid email or password");
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json("Invalid email or password");
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key");

    res.json({ user, token });
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Protected route
userController.get("/protected", authenticateToken, async (req, res) => {
  const { id } = req.body;

  try {
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .where("user.id = :userId", { id })
      .getOne();

    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

export default userController;
