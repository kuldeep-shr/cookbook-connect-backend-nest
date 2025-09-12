// import { ILike } from "typeorm";
// import { AppDataSource } from "../../ormconfig";
// import { Prompt } from "../../entities/prompt/Prompt";
// import { User } from "../../entities/user/User";
// import { findCategoryByNameService } from "../services/category.service";

// interface PromptInput {
//   title: string;
//   body: string;
//   category: string; // category name
//   userId: string;
// }

// interface PromptQuery {
//   category?: string;
//   search?: string;
// }

// // 📝 Create Prompt
// export const createPromptService = async ({
//   title,
//   body,
//   category,
//   userId,
// }: PromptInput) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);
//   const userRepo = AppDataSource.getRepository(User);

//   // Step 1: Validate user
//   const user = await userRepo.findOne({
//     where: { id: userId },
//     select: ["id", "name", "email"],
//   });
//   if (!user) throw new Error("User not found");

//   // Step 2: Validate category by name
//   const categoryEntity = await findCategoryByNameService(category);
//   if (!categoryEntity) throw new Error("Category not found");

//   // Step 3: Prevent duplicate title for this user
//   const existingPrompt = await promptRepo.findOne({
//     where: { title, created_by: { id: userId } },
//   });
//   if (existingPrompt) {
//     return {
//       isNew: false,
//       message: "Prompt with this title already exists",
//       prompt: existingPrompt,
//     };
//   }

//   // Step 4: Save prompt
//   const newPrompt = promptRepo.create({
//     title: title.trim().toLocaleLowerCase(),
//     body: body.trim().toLocaleLowerCase(),
//     category: categoryEntity,
//     created_by: user,
//   });

//   await promptRepo.save(newPrompt);

//   return {
//     isNew: true,
//     message: "Prompt created successfully",
//     prompt: newPrompt,
//   };
// };

// // 📝 Get All Prompts (with search & category name filter)
// export const getPromptsService = async (
//   userId: string,
//   { category, search }: PromptQuery
// ) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);

//   const query = promptRepo
//     .createQueryBuilder("prompt")
//     .leftJoinAndSelect("prompt.category", "category")
//     .leftJoinAndSelect("prompt.created_by", "user")
//     .where("user.id = :userId", { userId });

//   // Fuzzy search for category name
//   if (category && category.trim() !== "") {
//     query.andWhere("LOWER(category.name) LIKE :category", {
//       category: `%${category.trim().toLowerCase()}%`,
//     });
//   }

//   // Fuzzy search for title
//   if (search && search.trim() !== "") {
//     query.andWhere(
//       "LOWER(prompt.title) LIKE :search OR LOWER(prompt.body) LIKE:search",
//       {
//         search: `%${search.trim().toLowerCase()}%`,
//       }
//     );
//   }

//   // Optional: select only prompt fields, add category & user explicitly
//   query
//     .select(["prompt.id", "prompt.title", "prompt.body", "prompt.createdAt"])
//     .addSelect([
//       "category.id",
//       "category.name",
//       "user.id",
//       "user.name",
//       "user.email",
//     ])
//     .orderBy("prompt.createdAt", "DESC");

//   const prompts = await query.getMany();

//   return prompts;
// };

// // 📝 Get Single Prompt by ID
// export const getPromptByIdService = async (id: string, userId: string) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);

//   const prompt = await promptRepo.findOne({
//     where: { id, created_by: { id: userId } },
//     relations: ["category"],
//   });

//   if (!prompt) throw new Error("Prompt not found");
//   return prompt;
// };

// // 📝 Update Prompt (using category name)
// export const updatePromptService = async (
//   id: string,
//   { title, body, category }: Partial<PromptInput>,
//   userId: string
// ) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);

//   const prompt = await promptRepo.findOne({
//     where: { id, created_by: { id: userId } },
//     relations: ["category"],
//   });
//   if (!prompt) throw new Error("Prompt not found");

//   if (title) prompt.title = title.trim().toLocaleUpperCase();
//   if (body) prompt.body = body.trim().toLocaleUpperCase();
//   prompt.last_updated = new Date();
//   if (category) {
//     const categoryEntity = await findCategoryByNameService(category);
//     if (!categoryEntity) throw new Error("Category not found");
//     prompt.category = categoryEntity;
//   }

//   await promptRepo.save(prompt);

//   return { message: "Prompt updated successfully", prompt };
// };

// // 📝 Delete Prompt
// export const deletePromptService = async (id: string, userId: string) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);

//   const prompt = await promptRepo.findOne({
//     where: { id, created_by: { id: userId } },
//   });
//   if (!prompt) throw new Error("Prompt not found");

//   await promptRepo.remove(prompt);

//   return { message: "Prompt deleted successfully" };
// };

// export const clonePromptService = async (promptId: string, userId: string) => {
//   const promptRepo = AppDataSource.getRepository(Prompt);

//   // Find the original prompt
//   const originalPrompt = await promptRepo.findOne({ where: { id: promptId } });
//   if (!originalPrompt) throw new Error("Prompt not found");

//   // Automatically generate new title and body
//   const clonedPrompt = promptRepo.create({
//     title: originalPrompt.title + " copy",
//     body: originalPrompt.body + " copy",
//     category: originalPrompt.category,
//     created_by: { id: userId },
//   });

//   await promptRepo.save(clonedPrompt);
//   return clonedPrompt;
// };
