// import request from "supertest";
// import app from "../../src/config/express";
// import { AppDataSource } from "../../ormconfig";

// let token: string;

// beforeAll(async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }

//   // Register a user and get token
//   const res = await request(app)
//     .post("/api/user/auth/register")
//     .send({
//       name: "Test User",
//       email: `test${Date.now()}@example.com`,
//       password: "Test@1234",
//     });

//   token = res.body.data.token;
// });

// describe("Prompt Library API", () => {
//   let promptId: string;

//   test("POST /api/prompts - should create a prompt", async () => {
//     const response = await request(app)
//       .post("/api/prompts")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         title: "Test Prompt",
//         body: "This is a test prompt body",
//         category: "finance",
//       });
//     expect(response.status).toBe(201);
//     expect(response.body.data.prompt.id).toBeDefined();
//     promptId = response.body.data.prompt.id;
//   });

//   test("GET /api/prompts - should fetch the prompt by ID", async () => {
//     const response = await request(app)
//       .get(`/api/prompts?category=finance`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//   });

//   test("GET /api/prompts - should search prompts by query", async () => {
//     const response = await request(app)
//       .get(`/api/prompts?`)
//       .query({ q: "Test" })
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body.data.length).toBeGreaterThanOrEqual(1);
//   });

//   test("PUT /api/prompts/:id - should update the prompt", async () => {
//     const response = await request(app)
//       .put(`/api/prompts/${promptId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ title: "Updated Test Prompt" });

//     expect(response.status).toBe(200);
//   });

//   test("DELETE /api/prompts/:id - should delete the prompt", async () => {
//     const response = await request(app)
//       .delete(`/api/prompts/${promptId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//   });
// });

// describe("User Auth API", () => {
//   let testEmail = `kuldeep${Date.now()}@test.com`;

//   test("POST /api/user/auth/register - should register a user and return token", async () => {
//     const res = await request(app).post("/api/user/auth/register").send({
//       name: "Kuldeep",
//       email: testEmail,
//       password: "@12Kuldeep",
//     });

//     expect(res.status).toBe(201);
//     expect(res.body.data.token).toBeDefined();
//   });

//   test("POST /api/user/auth/login - should login and return token", async () => {
//     const res = await request(app).post("/api/user/auth/login").send({
//       email: testEmail,
//       password: "@12Kuldeep",
//     });

//     expect(res.status).toBe(200);
//     expect(res.body.data.token).toBeDefined();
//   });
// });
