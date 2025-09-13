import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './dto/user.model';
import { verifyToken } from '../utilities/ApiUtilities';
import { UnauthorizedException } from '@nestjs/common';
// import { CommentModel } from './dto/comment.model';
// import { CreateCommentInput } from './dto/create-comment.input';

@Resolver(() => UserModel)
export class UserResolver {
  commentService: any;
  constructor(private userService: UserService) {}

  private getUserIdFromContext(ctx: any): string {
    const authHeader = ctx?.req?.headers?.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');
    const token = authHeader.replace('Bearer ', '').trim();
    const payload = verifyToken(token);
    if (!payload?.id) throw new UnauthorizedException('Invalid token');
    return payload.id;
  }

  @Query(() => [UserModel], { nullable: true })
  async users(@Args('id', { type: () => ID, nullable: true }) id?: string) {
    const result = await this.userService.getUsers(id);
    return Array.isArray(result) ? result : [result];
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => Boolean)
  async followUser(
    @Args('userId') userId: string,
    @Context() ctx: any,
  ): Promise<boolean> {
    const currentUserId = this.getUserIdFromContext(ctx);
    return this.userService.followUser(currentUserId, userId);
  }

  @Mutation(() => Boolean)
  async unfollowUser(
    @Args('userId') userId: string,
    @Context() ctx: any,
  ): Promise<boolean> {
    const currentUserId = this.getUserIdFromContext(ctx);
    return this.userService.unfollowUser(currentUserId, userId);
  }
}
