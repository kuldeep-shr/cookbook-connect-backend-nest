// import { Request, Response } from "express";
// import IController from "../../types/IController";
// import apiResponse from "../utilities/apiResponse";
// import httpStatusCodes from "http-status-codes";
// import {
//   createCategoryService,
//   getCategoriesService,
//   getCategoryByIdService,
//   updateCategoryService,
//   deleteCategoryService,
// } from "../services/category.service";

// // ✅ Create Category
// export const createCategory: IController = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     if (!name) {
//       return apiResponse.error(
//         res,
//         httpStatusCodes.BAD_REQUEST,
//         "Category name is required"
//       );
//     }

//     const category = await createCategoryService(name, description);
//     apiResponse.result(
//       res,
//       category,
//       httpStatusCodes.CREATED,
//       "Category created successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Get all categories
// export const getCategories: IController = async (req, res) => {
//   try {
//     const categories = await getCategoriesService();
//     apiResponse.result(
//       res,
//       categories,
//       httpStatusCodes.OK,
//       "Categories fetched successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Get category by ID
// export const getCategoryById: IController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const category = await getCategoryByIdService(id);

//     if (!category) {
//       return apiResponse.error(
//         res,
//         httpStatusCodes.NOT_FOUND,
//         "Category not found"
//       );
//     }

//     apiResponse.result(
//       res,
//       category,
//       httpStatusCodes.OK,
//       "Category fetched successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

// // ✅ Update category
// export const updateCategory: IController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description } = req.body;

//     const updatedCategory = await updateCategoryService(id, name, description);

//     return res.status(200).json({
//       success: true,
//       message: "Category updated successfully",
//       data: updatedCategory,
//     });
//   } catch (error: any) {
//     return res.status(400).json({
//       success: false,
//       message: error.message || "Failed to update category",
//     });
//   }
// };

// // ✅ Delete category
// export const deleteCategory: IController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const deleted = await deleteCategoryService(id);

//     if (!deleted) {
//       return apiResponse.error(
//         res,
//         httpStatusCodes.NOT_FOUND,
//         "Category not found"
//       );
//     }

//     apiResponse.result(
//       res,
//       {},
//       httpStatusCodes.OK,
//       "Category deleted successfully"
//     );
//   } catch (error: any) {
//     apiResponse.error(
//       res,
//       httpStatusCodes.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };
