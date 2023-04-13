import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username?: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  time: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
