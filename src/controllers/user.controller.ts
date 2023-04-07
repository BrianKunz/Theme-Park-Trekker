import express from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User.entity";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const userController = express.Router();

// Create a new user
userController.post("/signup", async (req, res) => {
  const { username, email, password, admin } = req.body;
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

// Delete a user
userController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

export default userController;
