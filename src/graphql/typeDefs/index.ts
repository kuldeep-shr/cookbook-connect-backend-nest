import { authTypeDefs } from "./auth.typeDefs";
import { userTypeDefs } from "./user.typeDefs";
import { recipeTypeDefs } from "./recipe.typeDefs";
import { ingredientTypeDefs } from "./ingredient.typeDefs";
import { instructionTypeDefs } from "./instruction.typeDefs";
import { ratingTypeDefs } from "./rating.typeDefs";
import { commentTypeDefs } from "./comment.typeDefs";
import { followTypeDefs } from "./follow.typeDefs";

export const typeDefs = [
  authTypeDefs,
  userTypeDefs,
  recipeTypeDefs,
  ingredientTypeDefs,
  instructionTypeDefs,
  ratingTypeDefs,
  commentTypeDefs,
  followTypeDefs,
];
