import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';

@Module({
  providers: [RecipeService, RecipeResolver]
})
export class RecipeModule {}
