import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field(() => ID)
  recipeId!: string;

  @Field(() => Int)
  value!: number; // 1-5 stars
}
