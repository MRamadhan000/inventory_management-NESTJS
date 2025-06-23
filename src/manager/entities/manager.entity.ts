import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column() 
  level: string;
}