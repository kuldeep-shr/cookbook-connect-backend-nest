import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(input: CreateRecipeInput, userId: string) {
    return this.prisma.recipe.create({
      data: {
        ...input,
        authorId: userId,
      },
      include: { author: true },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async getAllRecipes() {
    return this.prisma.recipe.findMany({
      include: { author: true },
    });
  }

  async updateRecipe(input: UpdateRecipeInput, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: input.id },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId)
      throw new UnauthorizedException('Not allowed');

    return this.prisma.recipe.update({
      where: { id: input.id },
      data: { ...input },
      include: { author: true },
    });
  }

  async deleteRecipe(id: string, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId)
      throw new UnauthorizedException('Not allowed');

    await this.prisma.recipe.delete({ where: { id } });
    return { message: 'Recipe deleted successfully' };
  }
}
