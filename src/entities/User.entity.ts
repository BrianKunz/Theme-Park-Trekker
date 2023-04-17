import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Trip } from "./Trip.entity";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";
import bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin?: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips?: Trip[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  async setPassword(password: string): Promise<void> {
    const saltRounds = 6;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
