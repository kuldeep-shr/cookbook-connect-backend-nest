// src/user/user.service.ts
import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
// import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get user(s)
  async getUsers(userId?: string) {
    if (userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      return user;
    }
    return this.prisma.user.findMany();
  }

  // Update user
  async updateUser(userId: string, input: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: input,
    });
  }

  // Follow user
  async followUser(userId: string, targetUserId: string): Promise<boolean> {
    if (userId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!target) throw new NotFoundException('Target user not found');

    await this.prisma.follow.create({
      data: { followerId: userId, followingId: targetUserId },
    });

    return true;
  }

  // Unfollow user
  async unfollowUser(userId: string, targetUserId: string): Promise<boolean> {
    await this.prisma.follow.deleteMany({
      where: { followerId: userId, followingId: targetUserId },
    });
    return true;
  }
}
