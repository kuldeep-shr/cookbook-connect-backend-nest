import * as express from "express";

import userAuth from "./user/auth.route";
// import categoryRoutes from "./category/category.routes";

// import promptRoutes from "./prompt/prompt.route";

const router = express.Router();

router.use("/user/auth", userAuth);
// router.use("/categories", categoryRoutes);
// router.use("/prompts", promptRoutes);

export default router;
