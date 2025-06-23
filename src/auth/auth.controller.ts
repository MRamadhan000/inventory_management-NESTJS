import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO : LoginDto) {
    return this.authService.login(loginDTO);
  }

  @Post('register')
  async register(@Body() registerDTO : RegisterDto){
    return this.authService.register(registerDTO);
  }


}
