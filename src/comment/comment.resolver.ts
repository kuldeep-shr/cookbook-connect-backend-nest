import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentModel } from './dto/comment.model';
import { CreateCommentInput } from './dto/create-comment.input';
import { verifyToken } from '../utilities/ApiUtilities';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  private getUserIdFromContext(ctx: any): string {
    const authHeader = ctx?.req?.headers?.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');
    const token = authHeader.replace('Bearer ', '').trim();
    const payload = verifyToken(token);
    if (!payload?.id) throw new UnauthorizedException('Invalid token');
    return payload.id;
  }

  @Mutation(() => CommentModel)
  async addComment(
    @Args('input') input: CreateCommentInput,
    @Context() ctx: any,
  ) {
    const currentUserId = this.getUserIdFromContext(ctx);
    return this.commentService.addComment(currentUserId, input);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('id') id: string, @Context() ctx: any) {
    const currentUserId = this.getUserIdFromContext(ctx);

    return this.commentService.deleteComment(currentUserId, id);
  }

  @Query(() => [CommentModel])
  async commentsByRecipe(@Args('recipeId') recipeId: string) {
    return this.commentService.getCommentsByRecipe(recipeId);
  }
}
