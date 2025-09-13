import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserModel } from '../../user/dto/user.model';

@ObjectType()
export class IngredientModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  quantity!: string;
}

@ObjectType()
export class InstructionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  stepNo!: number;

  @Field()
  text!: string;
}

@ObjectType()
export class RecipeModel {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  cuisine?: string | null;

  @Field({ nullable: true })
  difficulty?: string | null;

  @Field(() => Int, { nullable: true })
  cookingTime?: number | null;

  @Field()
  createdAt!: Date;

  @Field(() => UserModel)
  author!: UserModel;

  @Field(() => [IngredientModel], { nullable: true })
  ingredients?: IngredientModel[] | null;

  @Field(() => [InstructionModel], { nullable: true })
  instructions?: InstructionModel[] | null;
}
