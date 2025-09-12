import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [RecipeService, RecipeResolver, PrismaService],
})
export class RecipeModule {}
