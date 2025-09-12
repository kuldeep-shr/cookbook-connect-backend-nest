import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get user(s) dynamically
  async getUsers(userId?: string) {
    if (userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      return user;
    }
    return this.prisma.user.findMany();
  }

  // Update user dynamically
  async updateUser(userId: string, input: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: input,
    });
    return user;
  }
}
