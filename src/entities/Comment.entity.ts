import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  time: Date;

  @Column()
  body: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
