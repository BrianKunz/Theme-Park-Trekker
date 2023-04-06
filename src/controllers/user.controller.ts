import express from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userController = express.Router();

// Create a new user
userController.post("/signup", async (req, res) => {
  const { username, email, password, admin } = req.params;
  try {
    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, email, password, admin })
      .execute();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, admin } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = password || user.password;
      user.admin = admin || user.admin;
      await userRepository.save(user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    if (user) {
      await userRepository.remove(user);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
