import { InputType, Field, Int } from '@nestjs/graphql';

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
}
