import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Manager } from "src/manager/entities/manager.entity";
import { Employee } from "src/employee/entities/employee.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @OneToOne(() => Manager, (manager) => manager.user)
  manager: Manager;
}