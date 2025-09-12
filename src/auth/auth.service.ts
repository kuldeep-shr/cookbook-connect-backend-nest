/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from '../utilities/ApiUtilities';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(input: RegisterInput): Promise<any> {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) throw new UnauthorizedException('Email already exists');

    const hashed = await hashPassword(input.password);

    const user = await this.prisma.user.create({
      data: { ...input, password: hashed },
    });

    const token = generateToken({ id: user.id, email: user.email });

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async signin(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await comparePasswords(input.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email });
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
