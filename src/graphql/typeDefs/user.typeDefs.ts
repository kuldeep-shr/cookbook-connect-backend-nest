import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String!
    followers: [Follow!]!
    following: [Follow!]!
    recipes: [Recipe!]!
    ratings: [Rating!]!
    comments: [Comment!]!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;
