import dotenv from "dotenv";
dotenv.config();
// import chalk from "chalk";
import express from "express";
import { AppDataSource } from "./dataSource";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import tripController from "./controllers/trip.controller";
import commentController from "./controllers/comment.controller";
import morgan from "morgan";
import cors from "cors";
import { authenticateToken } from "./authorization/authenticate";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use("/users", userController);
app.use("/posts", postController);
app.use("/trips", authenticateToken, tripController);
app.use("/comments", commentController);

app.get("/", (_, res) => {
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is starting 🚀 on PORT: ${PORT}`);
});
