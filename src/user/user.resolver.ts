import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './dto/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

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
}
