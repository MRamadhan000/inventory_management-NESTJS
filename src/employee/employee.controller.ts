// src/employee/employee.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards,Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Response } from 'express';

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

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }

}