import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class UpdateIngredientInput {
  @Field()
  name!: string;

  @Field()
  quantity!: string;
}

@InputType()
export class UpdateInstructionInput {
  @Field(() => Int)
  stepNo!: number;

  @Field()
  text!: string;
}

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

  @Field(() => [UpdateIngredientInput], { nullable: true })
  ingredients?: UpdateIngredientInput[];

  @Field(() => [UpdateInstructionInput], { nullable: true })
  instructions?: UpdateInstructionInput[];
}
