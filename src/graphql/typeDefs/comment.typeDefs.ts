import { gql } from "apollo-server-express";

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    text: String!
    user: User!
    recipe: Recipe!
    createdAt: String!
  }

  type Query {
    comments(recipeId: ID!): [Comment!]!
  }

  type Mutation {
    addComment(userId: ID!, recipeId: ID!, text: String!): Comment!
  }
`;
