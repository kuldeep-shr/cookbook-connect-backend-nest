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
        title: input.title,
        description: input.description,
        cuisine: input.cuisine,
        difficulty: input.difficulty,
        cookingTime: input.cookingTime,
        authorId: userId,
        ingredients: {
          create:
            input.ingredients?.map((i) => ({
              name: i.name,
              quantity: i.quantity,
            })) || [],
        },
        instructions: {
          create:
            input.instructions?.map((i) => ({
              stepNo: i.stepNo,
              text: i.text,
            })) || [],
        },
      },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async updateRecipe(input: UpdateRecipeInput, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: input.id },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId) {
      throw new UnauthorizedException('Not authorized to update this recipe');
    }

    return this.prisma.recipe.update({
      where: { id: input.id },
      data: {
        title: input.title ?? recipe.title,
        description: input.description ?? recipe.description,
        cuisine: input.cuisine ?? recipe.cuisine,
        difficulty: input.difficulty ?? recipe.difficulty,
        cookingTime: input.cookingTime ?? recipe.cookingTime,
        ingredients: {
          deleteMany: { recipeId: input.id },
          create:
            input.ingredients?.map((i) => ({
              name: i.name,
              quantity: i.quantity,
            })) || [],
        },
        instructions: {
          deleteMany: { recipeId: input.id },
          create:
            input.instructions?.map((i) => ({
              stepNo: i.stepNo,
              text: i.text,
            })) || [],
        },
      },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async getAllRecipes() {
    return this.prisma.recipe.findMany({
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async deleteRecipe(id: string, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId)
      throw new UnauthorizedException('Not allowed to delete this recipe');

    await this.prisma.recipe.delete({ where: { id } });
    return 'Recipe deleted successfully'; // ✅ match resolver return type
  }
}
