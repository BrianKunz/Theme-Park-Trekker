import express from "express";
import { AppDataSource } from "../dataSource";
import { Comment } from "../entities/Comment.entity";
const commentController = express.Router();

//Index
commentController.get("/", async (req, res) => {
  try {
    const data = await AppDataSource.createQueryBuilder(
      Comment,
      "comment"
    ).getMany();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Show
commentController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AppDataSource.createQueryBuilder(Comment, "comment")
      .where("comment.id = :id", { id })
      .getOne();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Create
commentController.post("/", async (req, res) => {
  const { username, time, body } = req.params;

  try {
    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Comment)
      .values({ username, time, body });
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Update
commentController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const updatedComment = await AppDataSource.createQueryBuilder()
      .update(Comment)
      .set({ body })
      .where("id = :id", { id })
      .execute();
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Delete
commentController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Comment)
      .where("id = :id", { id })
      .execute();
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

export default commentController;
