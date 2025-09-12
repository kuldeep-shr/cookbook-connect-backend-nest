import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  type AuthPayload {
    id: ID!
    name: String
    email: String!
    token: String!
    valid: Boolean!
  }

  type Mutation {
    signup(name: String, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
