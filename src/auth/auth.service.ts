// src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDTO: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByName(loginDTO.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10); // saltRounds = 10

    await this.usersService.create({
      name: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }
}