import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
