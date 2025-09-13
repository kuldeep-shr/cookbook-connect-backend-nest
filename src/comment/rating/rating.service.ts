import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateRatingInput } from '../dto/create-rating.input';
// import { RatingModel } from '../dto/rating.model';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async addRating(userId: string, input: CreateRatingInput) {
    // Check if recipe exists
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: input.recipeId },
      include: { author: true },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');

    // Create rating
    const rating = await this.prisma.rating.create({
      data: {
        value: input.value,
        userId,
        recipeId: input.recipeId,
      },
      include: {
        user: true, // author of rating
        recipe: { include: { author: true } },
      },
    });
    return {
      id: rating.id,
      value: rating.value,
      createdAt: rating.createdAt,
      author: rating.user, // maps to UserModel
      recipe: rating.recipe, // maps to RecipeModel
    };
  }

  //   async updateRating(
  //     userId: string,
  //     ratingId: string,
  //     value: number,
  //   ): Promise<RatingModel> {
  //     const existing = await this.prisma.rating.findUnique({
  //       where: { id: ratingId },
  //     });
  //     if (!existing) throw new NotFoundException('Rating not found');
  //     if (existing.authorId !== userId)
  //       throw new NotFoundException('Not authorized');

  //     return this.prisma.rating.update({
  //       where: { id: ratingId },
  //       data: { value },
  //       include: { author: true, recipe: true },
  //     });
  //   }

  //   async deleteRating(userId: string, ratingId: string): Promise<boolean> {
  //     const existing = await this.prisma.rating.findUnique({
  //       where: { id: ratingId },
  //     });
  //     if (!existing) throw new NotFoundException('Rating not found');
  //     if (existing.authorId !== userId)
  //       throw new NotFoundException('Not authorized');

  //     await this.prisma.rating.delete({ where: { id: ratingId } });
  //     return true;
  //   }

  //   async getRatingsByRecipe(recipeId: string): Promise<RatingModel[]> {
  //     return this.prisma.rating.findMany({
  //       where: { recipeId },
  //       include: { author: true, recipe: true },
  //     });
  //   }
}
