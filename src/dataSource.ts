import { createConnection, Connection, Repository } from "typeorm";
import { User } from "./entities/User.entity";
import { Post } from "./entities/Post.entity";
import { Comment } from "./entities/Comment.entity";
import { Trip } from "./entities/Trip.entity";

class AppDataSource {
  static connection: Connection;
  static userRepository: Repository<User>;
  static postRepository: Repository<Post>;
  static commentRepository: Repository<Comment>;
  static tripRepository: Repository<Trip>;

  static async initialize() {
    AppDataSource.connection = await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Post, Comment, Trip],
      synchronize: true,
    });
    console.log("Connected to database:", AppDataSource.connection.isConnected);
    AppDataSource.userRepository = AppDataSource.connection.getRepository(User);
    AppDataSource.postRepository = AppDataSource.connection.getRepository(Post);
    AppDataSource.commentRepository =
      AppDataSource.connection.getRepository(Comment);
    AppDataSource.tripRepository = AppDataSource.connection.getRepository(Trip);
  }

  static createQueryBuilder(entity: any, alias: string) {
    return this.connection.createQueryBuilder(entity, alias);
  }
}
export default AppDataSource;
