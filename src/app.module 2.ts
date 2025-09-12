import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { Request, Response } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // ✅ required in v10
      typePaths: [join(process.cwd(), 'graphql/**/*.gql')],
      sortSchema: true, // optional: sorts schema alphabetically
      playground: true, // enable GraphQL playground
      introspection: true, // allow introspection
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }), // ✅ typed req/res for resolvers
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql/graphql-types.ts'), // generates TS types
      //   outputAs: 'class', // output as class for code-first decorators
      // },
    }),
    AuthModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
