import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  time: Date;

  @Column()
  body: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.trips)
  user: User;
}
