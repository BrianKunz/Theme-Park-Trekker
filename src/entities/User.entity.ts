import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  async setPassword(password: string): Promise<void> {
    const saltRounds = 6;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
