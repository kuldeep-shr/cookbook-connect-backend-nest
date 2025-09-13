import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateIngredientInput {
  @Field()
  name!: string;

  @Field()
  quantity!: string;
}

@InputType()
export class CreateInstructionInput {
  @Field(() => Int)
  stepNo!: number;

  @Field()
  text!: string;
}

@InputType()
export class CreateRecipeInput {
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

  @Field(() => [CreateIngredientInput], { nullable: true })
  ingredients?: CreateIngredientInput[];

  @Field(() => [CreateInstructionInput], { nullable: true })
  instructions?: CreateInstructionInput[];
}
