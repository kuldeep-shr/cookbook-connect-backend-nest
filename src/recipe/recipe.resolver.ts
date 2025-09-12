/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Resolver, Mutation, Query, Args, ID, Context } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './dto/recipe.model';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { verifyToken } from '../utilities/ApiUtilities';

@Resolver(() => RecipeModel)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  private getUserIdFromContext(ctx: any): string {
    const authHeader = ctx.req?.headers?.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const payload = verifyToken(token);
    if (!payload?.id) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload.id;
  }

  @Mutation(() => RecipeModel)
  async createRecipe(
    @Args('input') input: CreateRecipeInput,
    @Context() ctx: any,
  ): Promise<RecipeModel> {
    const userId = this.getUserIdFromContext(ctx);
    return this.recipeService.createRecipe(input, userId);
  }

  @Query(() => RecipeModel, { nullable: true })
  async recipe(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<RecipeModel | null> {
    return this.recipeService.getRecipe(id);
  }

  @Query(() => [RecipeModel])
  async recipes(): Promise<RecipeModel[]> {
    return this.recipeService.getAllRecipes();
  }

  @Mutation(() => RecipeModel)
  async updateRecipe(
    @Args('input') input: UpdateRecipeInput,
    @Context() ctx: any,
  ): Promise<RecipeModel> {
    const userId = this.getUserIdFromContext(ctx);
    return this.recipeService.updateRecipe(input, userId);
  }

  @Mutation(() => String)
  async deleteRecipe(
    @Args('id', { type: () => ID }) id: string,
    @Context() ctx: any,
  ): Promise<string> {
    const userId = this.getUserIdFromContext(ctx);
    await this.recipeService.deleteRecipe(id, userId);
    return 'Recipe deleted successfully';
  }
}
