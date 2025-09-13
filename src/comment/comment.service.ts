import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async addComment(userId: string, input: CreateCommentInput) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: input.recipeId },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');

    return this.prisma.comment.create({
      data: {
        text: input.text,
        authorId: userId,
        recipeId: input.recipeId,
      },
      include: {
        author: true,
        recipe: true,
      },
    });
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== userId)
      throw new UnauthorizedException('Cannot delete this comment');

    await this.prisma.comment.delete({ where: { id: commentId } });
    return true;
  }

  async getCommentsByRecipe(recipeId: string) {
    return this.prisma.comment.findMany({
      where: { recipeId },
      include: { author: true, recipe: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
