import { gql } from "apollo-server-express";

export const recipeTypeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    description: String
    cuisine: String
    difficulty: String
    cookingTime: Int
    ingredients: [Ingredient!]!
    instructions: [Instruction!]!
    ratings: [Rating!]!
    comments: [Comment!]!
    author: User!
    createdAt: String!
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(
      title: String!
      description: String
      cuisine: String
      difficulty: String
      cookingTime: Int
      authorId: ID!
    ): Recipe!
  }
`;
