// import express from "express";
// import { authenticateToken } from "../../middlewares/authenticate";
// // import { customRateLimiter } from "../../middlewares/rateLimiter";
// // import { redisMemoMiddleware } from "../../middlewares/cacheMiddleware";

// import {
//   createPrompt,
//   getPromptById,
//   getPrompts,
//   updatePrompt,
//   deletePrompt,
//   clonePrompt,
// } from "../../controllers/prompt.controller";

// const router = express.Router();

// // ✅ Create a new prompt
// router.post(
//   "/",
//   authenticateToken,
//   // customRateLimiter,
//   createPrompt
// );

// // ✅ Get all prompts (with cache)
// router.get(
//   "/",
//   authenticateToken,
//   //   customRateLimiter,
//   //   redisMemoMiddleware,
//   getPrompts
// );

// // ✅ Get a single prompt by ID (with cache)
// router.get(
//   "/:id",
//   authenticateToken,
//   //   customRateLimiter,
//   //   redisMemoMiddleware,
//   getPromptById
// );

// // ✅ Update a prompt
// router.put(
//   "/:id",
//   authenticateToken,
//   // customRateLimiter,
//   updatePrompt
// );

// // ✅ Delete a prompt
// router.delete(
//   "/:id",
//   authenticateToken,
//   // customRateLimiter,
//   deletePrompt
// );

// router.post("/:id/clone", authenticateToken, clonePrompt);

// export default router;
