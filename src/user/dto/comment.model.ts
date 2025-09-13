import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from '../../user/dto/user.model';
import { RecipeModel } from '../../recipe/dto/recipe.model';

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;

  @Field()
  createdAt!: Date;

  @Field(() => UserModel)
  author!: UserModel;

  @Field(() => RecipeModel)
  recipe!: RecipeModel;
}
