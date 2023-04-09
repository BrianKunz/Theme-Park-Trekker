import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: boolean;

  @Column()
  time: Date;

  @Column()
  comments: Array;
}
