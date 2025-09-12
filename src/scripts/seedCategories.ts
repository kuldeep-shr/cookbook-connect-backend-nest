// import "reflect-metadata";
// import { AppDataSource } from "../../ormconfig";
// import { Category } from "../../entities/prompt/Category";

// const categories = [
//   { name: "legal", description: "Legal related prompts" },
//   { name: "finance", description: "Finance related prompts" },
//   { name: "health", description: "Health related prompts" },
//   { name: "education", description: "Education related prompts" },
//   { name: "technology", description: "Technology related prompts" },
// ];

// const seedCategories = async () => {
//   try {
//     await AppDataSource.initialize();
//     console.log("Database connected");

//     const categoryRepo = AppDataSource.getRepository(Category);

//     for (const cat of categories) {
//       const existing = await categoryRepo.findOne({
//         where: { name: cat.name },
//       });
//       if (!existing) {
//         const newCategory = categoryRepo.create({
//           name: cat.name.toLowerCase().trim(),
//           description: cat.description?.toLowerCase().trim(),
//         });
//         await categoryRepo.save(newCategory);
//         console.log(`Category '${cat.name}' added`);
//       } else {
//         console.log(`Category '${cat.name}' already exists`);
//       }
//     }

//     console.log("Seeding complete");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error seeding categories:", error);
//     process.exit(1);
//   }
// };

// seedCategories();
