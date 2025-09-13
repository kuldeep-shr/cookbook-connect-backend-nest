import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  recipeId!: string;

  @Field()
  text!: string;
}
