import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  date: Date;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  flight: string;
}
