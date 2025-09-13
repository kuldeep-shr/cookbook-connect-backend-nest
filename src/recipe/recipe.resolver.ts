import { Resolver, Mutation, Query, Args, ID, Context } from '@nestjs/graphql';
import {
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './dto/recipe.model';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { verifyToken } from '../utilities/ApiUtilities';

@Resolver(() => RecipeModel)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Extracts and validates user ID from JWT token in request context
   */
  private getUserIdFromContext(ctx: any): string {
    try {
      const authHeader = ctx?.req?.headers?.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) {
        throw new UnauthorizedException('Authorization token is missing');
      }

      const payload = verifyToken(token);
      if (!payload?.id) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      return payload.id;
    } catch (err: any) {
      throw new UnauthorizedException(err.message || 'Authentication failed');
    }
  }

  /**
   * Create a new recipe
   */
  @Mutation(() => RecipeModel, { name: 'createRecipe' })
  async createRecipe(
    @Args('input') input: CreateRecipeInput,
    @Context() ctx: any,
  ): Promise<RecipeModel> {
    try {
      const userId = this.getUserIdFromContext(ctx);
      const recipe = await this.recipeService.createRecipe(input, userId);
      return recipe;
    } catch (err: any) {
      throw new BadRequestException(
        err.message || 'Failed to create recipe. Please try again.',
      );
    }
  }

  /**
   * Get a single recipe by ID
   */
  @Query(() => RecipeModel, { name: 'recipe', nullable: true })
  async getRecipe(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<RecipeModel | null> {
    try {
      const recipe = await this.recipeService.getRecipe(id);
      if (!recipe) throw new NotFoundException('Recipe not found');
      return recipe;
    } catch (err: any) {
      throw new NotFoundException(err.message || 'Recipe not found');
    }
  }

  /**
   * Get all recipes
   */
  @Query(() => [RecipeModel], { name: 'recipes' })
  async getAllRecipes(): Promise<RecipeModel[]> {
    try {
      return await this.recipeService.getAllRecipes();
    } catch (err: any) {
      throw new InternalServerErrorException(
        err.message || 'Failed to fetch recipes',
      );
    }
  }

  /**
   * Update a recipe (only owner can update)
   */
  @Mutation(() => RecipeModel, { name: 'updateRecipe' })
  async updateRecipe(
    @Args('input') input: UpdateRecipeInput,
    @Context() ctx: any,
  ): Promise<RecipeModel> {
    try {
      const userId = this.getUserIdFromContext(ctx);
      const updated = await this.recipeService.updateRecipe(input, userId);
      return updated;
    } catch (err: any) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException(
          'You are not allowed to update this recipe',
        );
      }
      throw new BadRequestException(
        err.message || 'Failed to update recipe. Please try again.',
      );
    }
  }

  /**
   * Delete a recipe (only owner can delete)
   */
  @Mutation(() => Boolean, { name: 'deleteRecipe' })
  async deleteRecipe(
    @Args('id', { type: () => ID }) id: string,
    @Context() ctx: any,
  ): Promise<boolean> {
    try {
      const userId = this.getUserIdFromContext(ctx);
      await this.recipeService.deleteRecipe(id, userId);
      return true;
    } catch (err: any) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException('Recipe not found');
      }
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException(
          'You are not allowed to delete this recipe',
        );
      }
      throw new InternalServerErrorException(
        err.message || 'Failed to delete recipe',
      );
    }
  }
}
