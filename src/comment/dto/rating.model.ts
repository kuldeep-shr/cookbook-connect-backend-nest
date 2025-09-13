import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserModel } from '../../user/dto/user.model';
import { RecipeModel } from '../../recipe/dto/recipe.model';

@ObjectType()
export class RatingModel {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  value!: number;

  @Field()
  createdAt!: Date;

  @Field(() => UserModel)
  author!: UserModel;

  @Field(() => RecipeModel)
  recipe!: RecipeModel;
}
