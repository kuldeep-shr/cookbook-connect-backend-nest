import { gql } from "apollo-server-express";

export const instructionTypeDefs = gql`
  type Instruction {
    id: ID!
    stepNo: Int!
    text: String!
    recipe: Recipe!
  }
`;
