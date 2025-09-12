import { Resolver, Mutation, Query, Args, ID, Context } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './dto/recipe.model';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { verifyToken } from '../utilities/ApiUtilities';

@Resolver(() => RecipeModel)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  private getUserIdFromContext(ctx: any): string {
    const authHeader = ctx.req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Authorization token missing');
    const payload = verifyToken(token);
    return payload.id;
  }

  @Mutation(() => RecipeModel)
  async createRecipe(
    @Args('input') input: CreateRecipeInput,
    @Context() ctx: any,
  ) {
    const userId = this.getUserIdFromContext(ctx);
    return this.recipeService.createRecipe(input, userId);
  }

  @Query(() => RecipeModel)
  async recipe(@Args('id', { type: () => ID }) id: string) {
    return this.recipeService.getRecipe(id);
  }

  @Query(() => [RecipeModel])
  async recipes() {
    return this.recipeService.getAllRecipes();
  }

  @Mutation(() => RecipeModel)
  async updateRecipe(
    @Args('input') input: UpdateRecipeInput,
    @Context() ctx: any,
  ) {
    const userId = this.getUserIdFromContext(ctx);
    return this.recipeService.updateRecipe(input, userId);
  }

  @Mutation(() => String)
  async deleteRecipe(
    @Args('id', { type: () => ID }) id: string,
    @Context() ctx: any,
  ) {
    const userId = this.getUserIdFromContext(ctx);
    await this.recipeService.deleteRecipe(id, userId);
    return 'Recipe deleted successfully';
  }
}
