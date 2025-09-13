import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { RatingModel } from '../dto/rating.model';
import { CreateRatingInput } from '../dto/create-rating.input';
import { UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '../../utilities/ApiUtilities';

@Resolver(() => RatingModel)
export class RatingResolver {
  constructor(private ratingService: RatingService) {}

  private getUserIdFromContext(ctx: any): string {
    const authHeader = ctx?.req?.headers?.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');

    const token = authHeader.replace('Bearer ', '').trim();
    const payload = verifyToken(token);
    if (!payload?.id) throw new UnauthorizedException('Invalid token');

    return payload.id;
  }

  @Mutation(() => RatingModel)
  async addRating(
    @Args('input') input: CreateRatingInput,
    @Context() ctx: any,
  ): Promise<RatingModel> {
    const userId = this.getUserIdFromContext(ctx);
    console.log('here');

    return this.ratingService.addRating(userId, input);
  }

  //   @Mutation(() => RatingModel)
  //   async updateRating(
  //     @Args('id') id: string,
  //     @Args('value') value: number,
  //     @Context() ctx: any,
  //   ): Promise<RatingModel> {
  //     const userId = this.getUserIdFromContext(ctx);
  //     return this.ratingService.updateRating(userId, id, value);
  //   }

  //   @Mutation(() => Boolean)
  //   async deleteRating(
  //     @Args('id') id: string,
  //     @Context() ctx: any,
  //   ): Promise<boolean> {
  //     const userId = this.getUserIdFromContext(ctx);
  //     return this.ratingService.deleteRating(userId, id);
  //   }

  //   @Query(() => [RatingModel])
  //   async ratingsByRecipe(
  //     @Args('recipeId') recipeId: string,
  //   ): Promise<RatingModel[]> {
  //     return this.ratingService.getRatingsByRecipe(recipeId);
  //   }
}
