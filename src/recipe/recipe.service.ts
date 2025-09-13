import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  // ------------------ BASIC CRUD ------------------

  async createRecipe(input: CreateRecipeInput, userId: string) {
    return this.prisma.recipe.create({
      data: {
        title: input.title,
        description: input.description,
        cuisine: input.cuisine,
        difficulty: input.difficulty,
        cookingTime: input.cookingTime,
        authorId: userId,
        ingredients: {
          create:
            input.ingredients?.map((i) => ({
              name: i.name,
              quantity: i.quantity,
            })) || [],
        },
        instructions: {
          create:
            input.instructions?.map((i) => ({
              stepNo: i.stepNo,
              text: i.text,
            })) || [],
        },
      },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async updateRecipe(input: UpdateRecipeInput, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: input.id },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId) {
      throw new UnauthorizedException('Not authorized to update this recipe');
    }

    return this.prisma.recipe.update({
      where: { id: input.id },
      data: {
        title: input.title ?? recipe.title,
        description: input.description ?? recipe.description,
        cuisine: input.cuisine ?? recipe.cuisine,
        difficulty: input.difficulty ?? recipe.difficulty,
        cookingTime: input.cookingTime ?? recipe.cookingTime,
        ingredients: {
          deleteMany: { recipeId: input.id },
          create:
            input.ingredients?.map((i) => ({
              name: i.name,
              quantity: i.quantity,
            })) || [],
        },
        instructions: {
          deleteMany: { recipeId: input.id },
          create:
            input.instructions?.map((i) => ({
              stepNo: i.stepNo,
              text: i.text,
            })) || [],
        },
      },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async getAllRecipes() {
    return this.prisma.recipe.findMany({
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async deleteRecipe(id: string, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.authorId !== userId)
      throw new UnauthorizedException('Not allowed to delete this recipe');

    await this.prisma.recipe.delete({ where: { id } });
    return 'Recipe deleted successfully';
  }

  // ------------------ ADVANCED QUERIES ------------------

  // 1️⃣ Single recipe with average rating + comments
  async getRecipeWithStats(id: string) {
    try {
      const result = await this.prisma.$queryRaw<
        Array<{
          id: string;
          title: string;
          avg_rating: number;
          comment_count: number;
        }>
      >`
        SELECT r.id, r.title,
               COALESCE(AVG(rt.value), 0) AS avg_rating,
               COUNT(c.id) AS comment_count
        FROM "Recipe" r
        LEFT JOIN "Rating" rt ON r.id = rt."recipeId"
        LEFT JOIN "Comment" c ON r.id = c."recipeId"
        WHERE r.id = ${id}
        GROUP BY r.id;
      `;

      if (!result || result.length === 0) {
        throw new NotFoundException('Recipe not found with stats');
      }

      return result[0];
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 2️⃣ All recipes with stats
  async getAllRecipesWithStats() {
    try {
      return await this.prisma.$queryRaw<
        Array<{
          id: string;
          title: string;
          avg_rating: number;
          comment_count: number;
        }>
      >`
        SELECT r.id, r.title,
               COALESCE(AVG(rt.value), 0) AS avg_rating,
               COUNT(c.id) AS comment_count
        FROM "Recipe" r
        LEFT JOIN "Rating" rt ON r.id = rt."recipeId"
        LEFT JOIN "Comment" c ON r.id = c."recipeId"
        GROUP BY r.id
        ORDER BY avg_rating DESC;
      `;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 3️⃣ Users with most followed recipes
  async getTopFollowedUsers() {
    try {
      return await this.prisma.$queryRaw<
        Array<{ id: string; name: string; follower_count: number }>
      >`
        SELECT u.id, u.name, COUNT(f."followerId") AS follower_count
        FROM "User" u
        LEFT JOIN "Follow" f ON u.id = f."followingId"
        GROUP BY u.id
        ORDER BY follower_count DESC
        LIMIT 10;
      `;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 4️⃣ Recommendations based on user’s rating history
  async getRecommendations(userId: string) {
    try {
      return await this.prisma.$queryRaw<
        Array<{ id: string; title: string; cuisine: string }>
      >`
        SELECT r.id, r.title, r.cuisine
        FROM "Recipe" r
        WHERE r.cuisine IN (
          SELECT DISTINCT r2.cuisine
          FROM "Rating" rt
          JOIN "Recipe" r2 ON rt."recipeId" = r2.id
          WHERE rt."userId" = ${userId} AND rt.value >= 4
        )
        AND r.id NOT IN (
          SELECT "recipeId" FROM "Rating" WHERE "userId" = ${userId}
        );
      `;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 5️⃣ Recipes by multiple ingredient matches
  async getRecipesByIngredients(ingredients: string[]) {
    try {
      if (!ingredients || ingredients.length === 0) {
        throw new NotFoundException('No ingredients provided');
      }
      console.log('in serv', ingredients);
      const recipes = await this.prisma.$queryRaw<
        Array<{
          id: string;
          title: string;
          description: string;
          cuisine: string | null;
          difficulty: string | null;
          cookingTime: number | null;
          createdAt: Date;
          authorId: string;
          ingredients: string; // JSON array
          instructions: string; // JSON array
          comments: string; // JSON array
          ratings: string; // JSON array
          averageRating: number;
          commentCount: number;
        }>
      >`
  WITH recipe_data AS (
    SELECT r.*,
      COALESCE(json_agg(DISTINCT jsonb_build_object('id', i.id, 'name', i.name, 'quantity', i.quantity)) 
               FILTER (WHERE i.id IS NOT NULL), '[]') AS ingredients,
      COALESCE(json_agg(DISTINCT jsonb_build_object('id', ins.id, 'stepNo', ins."stepNo", 'text', ins.text)) 
               FILTER (WHERE ins.id IS NOT NULL), '[]') AS instructions,
      COALESCE(json_agg(DISTINCT jsonb_build_object('id', c.id, 'text', c.text, 'createdAt', c."createdAt", 'authorId', c."authorId")) 
               FILTER (WHERE c.id IS NOT NULL), '[]') AS comments,
      COALESCE(json_agg(DISTINCT jsonb_build_object('id', rt.id, 'value', rt.value, 'authorId', rt."userId")) 
               FILTER (WHERE rt.id IS NOT NULL), '[]') AS ratings,
      COALESCE(AVG(rt.value), 0) AS "averageRating",
      COUNT(DISTINCT c.id) AS "commentCount"
    FROM "Recipe" r
    LEFT JOIN "Ingredient" i ON r.id = i."recipeId"
    LEFT JOIN "Instruction" ins ON r.id = ins."recipeId"
    LEFT JOIN "Comment" c ON r.id = c."recipeId"
    LEFT JOIN "Rating" rt ON r.id = rt."recipeId"
    WHERE LOWER(i.name) = ANY(${ingredients.map((i) => i.toLowerCase())})
    GROUP BY r.id
  )
  SELECT * FROM recipe_data;
`;
      return recipes;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 6️⃣ User feed (recipes from followed users)
  async getUserFeed(userId: string) {
    try {
      return await this.prisma.$queryRaw<
        Array<{ id: string; title: string; createdAt: Date; authorId: string }>
      >`
        SELECT r.id, r.title, r."createdAt", r."authorId"
        FROM "Recipe" r
        JOIN "Follow" f ON r."authorId" = f."followingId"
        WHERE f."followerId" = ${userId}
        ORDER BY r."createdAt" DESC;
      `;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
