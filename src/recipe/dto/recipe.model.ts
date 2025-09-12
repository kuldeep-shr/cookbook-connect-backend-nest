import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserModel } from '../../user/dto/user.model';

@ObjectType()
export class RecipeModel {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  cuisine?: string;

  @Field({ nullable: true })
  difficulty?: string;

  @Field(() => Int, { nullable: true })
  cookingTime?: number;

  @Field()
  createdAt!: Date;

  @Field(() => UserModel)
  author!: UserModel;
}
