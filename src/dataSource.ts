import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Post } from "./entities/Post.entity";
import { Comment } from "./entities/Comment.entity";
import { Trip } from "./entities/Trip.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  synchronize: true,
  entities: [User, Post, Comment, Trip],
});
