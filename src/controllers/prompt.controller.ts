// import IController from "../../types/IController";
// import apiResponse from "../utilities/apiResponse";
// import httpStatusCodes from "http-status-codes";
// import {
//   createPromptService,
//   getPromptsService,
//   getPromptByIdService,
//   updatePromptService,
//   deletePromptService,
//   clonePromptService,
// } from "../services/prompt.service";

// // ✅ Create Prompt
// export const createPrompt: IController = async (req, res) => {
//   try {
//     const { title, body, category } = req.body;
//     const userId = req.user.id;

//     if (!title || !body || !category || !userId) {
//       return apiResponse.error(
//         res,
//         httpStatusCodes.BAD_REQUEST,
//         "Missing required fields"
//       );
//     }

//     const result = await createPromptService({
//       title,
//       body,
//       category,
//       userId,
//     });

//     apiResponse.result(res, result, httpStatusCodes.CREATED, result.message);
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message || "Something went wrong"
//     );
//   }
// };

// // ✅ Get All Prompts with filters (category + search)
// export const getPrompts: IController = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { category, q } = req.query;

//     const prompts = await getPromptsService(userId, {
//       category: category as string,
//       search: q as string,
//     });

//     apiResponse.result(
//       res,
//       prompts,
//       httpStatusCodes.OK,
//       "Prompts fetched successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Get Prompt by ID
// export const getPromptById: IController = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const prompt = await getPromptByIdService(id, userId);

//     apiResponse.result(
//       res,
//       prompt,
//       httpStatusCodes.OK,
//       "Prompt fetched successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       error.message.includes("not found")
//         ? httpStatusCodes.NOT_FOUND
//         : httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Update Prompt
// export const updatePrompt: IController = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;
//     const data = req.body;

//     const updated = await updatePromptService(id, data, userId);

//     apiResponse.result(res, updated, httpStatusCodes.OK, updated.message);
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       error.message.includes("not found")
//         ? httpStatusCodes.NOT_FOUND
//         : httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Delete Prompt
// export const deletePrompt: IController = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deleted = await deletePromptService(id, userId);

//     apiResponse.result(res, {}, httpStatusCodes.OK, deleted.message);
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       error.message.includes("not found")
//         ? httpStatusCodes.NOT_FOUND
//         : httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// //clone the prompt
// export const clonePrompt: IController = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const clonedPrompt = await clonePromptService(id, userId);

//     apiResponse.result(
//       res,
//       clonedPrompt,
//       httpStatusCodes.CREATED,
//       "Prompt cloned successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       error.message.includes("not found")
//         ? httpStatusCodes.NOT_FOUND
//         : httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };
