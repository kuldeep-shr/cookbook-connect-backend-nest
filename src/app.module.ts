import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CommentModule } from './comment/comment.module';

import { PrismaService } from './prisma.service';
import { Request, Response } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // ✅ required in v10
      typePaths: [join(process.cwd(), '/graphql/**/*.gql')],
      sortSchema: true, // optional: sorts schema alphabetically
      playground: true, // enable GraphQL playground
      introspection: true, // allow introspection
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    AuthModule,
    UserModule,
    RecipeModule,
    CommentModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
