// src/employee/employee.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('employee')
@UseGuards(AuthGuard, RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post('create')
  @Roles(Role.EMPLOYEE)
  async createEmployee(@Body() body: { userId: number; department: string }): Promise<Employee> {
    return this.employeeService.createEmployee(body.userId, body.department);
  }

  @Get('by-user/:userId')
  @Roles(Role.EMPLOYEE)
  async getByUserId(@Param('userId') userId: number) {
    return this.employeeService.findByUserId(+userId) || null;
  }
}