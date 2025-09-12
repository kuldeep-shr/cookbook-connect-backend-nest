import { gql } from "apollo-server-express";

export const followTypeDefs = gql`
  type Follow {
    id: ID!
    follower: User!
    following: User!
  }

  type Query {
    followers(userId: ID!): [Follow!]!
    following(userId: ID!): [Follow!]!
  }

  type Mutation {
    followUser(followerId: ID!, followingId: ID!): Follow!
  }
`;
