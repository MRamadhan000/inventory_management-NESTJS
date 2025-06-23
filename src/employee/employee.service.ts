import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createEmployee(userId: number, department: string): Promise<Employee> {    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newEmployee = this.employeeRepository.create({
      user,
      department,
    });

    return this.employeeRepository.save(newEmployee);
  }

  async findByUserId(userId: number){
    const employee = await this.employeeRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!employee) {
      return null
    }

    return employee;
  }
}