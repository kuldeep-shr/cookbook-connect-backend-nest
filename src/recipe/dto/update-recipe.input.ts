import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRecipeInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  cuisine?: string;

  @Field({ nullable: true })
  difficulty?: string;

  @Field(() => Int, { nullable: true })
  cookingTime?: number;
}
