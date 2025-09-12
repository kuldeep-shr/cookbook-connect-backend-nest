import { gql } from "apollo-server-express";

export const ratingTypeDefs = gql`
  type Rating {
    id: ID!
    value: Int!
    user: User!
    recipe: Recipe!
  }
`;
