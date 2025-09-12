import { gql } from "apollo-server-express";

export const ingredientTypeDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    quantity: String!
    recipe: Recipe!
  }
`;
