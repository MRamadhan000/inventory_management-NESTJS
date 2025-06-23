import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [UsersModule,JwtModule.register({
    global:true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '3000s'}
  }), EmployeeModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
