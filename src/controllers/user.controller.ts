import express from "express";
import AppDataSource from "../dataSource";
import { User } from "../entities/User.entity";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../authorization/authenticate";

const userController = express.Router();

// Create user
userController.post("/signup", async (req, res) => {
  const { username, email, password, admin } = req.body;

  try {
    const user = new User();
    user.username = username;
    user.email = email;
    await user.setPassword(password);
    user.admin = admin;

    await AppDataSource.initialize();
    const data = await AppDataSource.createQueryBuilder(User, "user")
      .insert()
      .into(User)
      .values(user)
      .execute();
    res.json(data);
    console.log("Created: ", user);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Login user
userController.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await AppDataSource.initialize();
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .where("user.username = :username", { username })
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
    const secret = process.env.JWT_SECRET || "default-secret";
    const token = jwt.sign({ userId: user.id }, secret);

    console.log("token: ", token);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Get all users
userController.get("/", async (_, res) => {
  try {
    await AppDataSource.initialize();
    const users = await AppDataSource.createQueryBuilder(
      User,
      "user"
    ).getMany();
    res.json(users);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Protected route
userController.get("/protected", authenticateToken, async (req, res) => {
  const { id } = req.body;

  try {
    await AppDataSource.initialize();
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
