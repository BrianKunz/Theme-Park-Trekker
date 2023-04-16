import express from "express";
import { AppDataSource } from "../dataSource";
import { Post } from "../entities/Post.entity";
const postController = express.Router();

//Index
postController.get("/", async (_, res) => {
  try {
    const data = await AppDataSource.createQueryBuilder(Post, "post").getMany();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Show
postController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AppDataSource.createQueryBuilder(Post, "post")
      .where("post.id = :id", { id })
      .getOne();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Create
postController.post("/", async (req, res) => {
  const { username, title, image, description, time, comments } = req.body;
  console.log(req.body);

  try {
    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Post)
      .values({ username, title, image, description, time, comments })
      .execute();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Update
postController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, description } = req.body;
  try {
    const updatedPost = await AppDataSource.createQueryBuilder()
      .update(Post)
      .set({ title, image, description })
      .where("id = :id", { id })
      .execute();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Delete
postController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Post)
      .where("id = :id", { id })
      .execute();
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

export default postController;
