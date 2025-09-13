<p align="center">
  <a href="https://cooking.com/" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" width="120" alt="Cooking Logo" />
  </a>
</p>

[![CircleCI](https://img.shields.io/circleci/build/github/your-org/cooking-app/master?token=abc123def456)](https://circleci.com/gh/your-org/cooking-app)
[![NPM Version](https://img.shields.io/npm/v/cooking-app.svg)](https://www.npmjs.com/package/cooking-app)
[![License](https://img.shields.io/npm/l/cooking-app.svg)](https://www.npmjs.com/package/cooking-app)
[![NPM Downloads](https://img.shields.io/npm/dm/cooking-app.svg)](https://www.npmjs.com/package/cooking-app)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/cooking)
[![Backers](https://opencollective.com/cooking/backers/badge.svg)](https://opencollective.com/cooking#backer)
[![Sponsors](https://opencollective.com/cooking/sponsors/badge.svg)](https://opencollective.com/cooking#sponsor)
[![Donate PayPal](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg)](https://paypal.me/cookingapp)
[![Support us](https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg)](https://opencollective.com/cooking#sponsor)
[![Follow on Twitter](https://img.shields.io/twitter/follow/cookingapp.svg?style=social&label=Follow)](https://twitter.com/cookingapp)

---

# 🍲 Cooking App

**Cooking App** is a **recipe sharing and discovery platform** built with:

- Node.js
- GraphQL
- Prisma
- Apollo Server
- PostgreSQL
- NestJS

It allows users to create, update, and explore recipes with ingredients, instructions, ratings, and comments. Users can follow each other and get a personalized feed.

---

## 🌐 Environment Variables

This project uses the following environment variables in the `.env` file:

```env
      DATABASE_URL=postgresql://user:password@localhost:5432/cooking_db
      PORT=3000
      JWT_SECRET=your_jwt_secret
      NODE_ENV=development
```

## 🏗 Architecture Overview

- **NestJS**: Provides modular backend structure and dependency injection.
- **GraphQL**: API layer for flexible queries and mutations.
- **Prisma**: ORM for PostgreSQL, supports raw queries and relations.
- **PostgreSQL**: Relational database storing users, recipes, comments, ratings, and followers.
- **Modules**: Organized by feature (User, Recipe, Comment, Rating, Auth).

**Flow**:

---

## 🗄 Database Design

### Tables / Models

**User**

| Field     | Type     | Notes          |
| --------- | -------- | -------------- |
| id        | UUID     | Primary key    |
| email     | String   | Unique         |
| password  | String   | Hashed         |
| name      | String?  | Optional       |
| createdAt | DateTime | Auto-generated |

Relations:

- `recipes`: Recipe[]
- `comments`: Comment[]
- `ratings`: Rating[]
- `followers` / `following`: Follow[]

---

**Recipe**

| Field       | Type     | Notes               |
| ----------- | -------- | ------------------- |
| id          | UUID     | Primary key         |
| title       | String   |                     |
| description | String   |                     |
| cuisine     | String?  | Optional            |
| difficulty  | String?  | Optional            |
| cookingTime | Int?     | Minutes             |
| createdAt   | DateTime | Auto-generated      |
| authorId    | UUID     | Foreign key to User |

Relations:

- `ingredients`: Ingredient[]
- `instructions`: Instruction[]
- `comments`: Comment[]
- `ratings`: Rating[]

---

**Ingredient**

| Field    | Type   |
| -------- | ------ |
| id       | UUID   |
| name     | String |
| quantity | String |
| recipeId | UUID   |

---

**Instruction**

| Field    | Type   |
| -------- | ------ |
| id       | UUID   |
| stepNo   | Int    |
| text     | String |
| recipeId | UUID   |

---

**Comment**

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| text      | String   |
| authorId  | UUID     |
| recipeId  | UUID     |
| createdAt | DateTime |

---

**Rating**

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| value     | Int      |
| authorId  | UUID     |
| recipeId  | UUID     |
| createdAt | DateTime |

---

**Follow**

| Field                           | Type |
| ------------------------------- | ---- |
| id                              | UUID |
| followerId                      | UUID |
| followingId                     | UUID |
| UNIQUE(followerId, followingId) |

## 🧪 API Testing (GraphQL)

You can test the API using **GraphQL Playground** or any GraphQL client (Postman, Insomnia, etc.).

**Steps:**

1. Make sure your server is running:

   ```bash
   yarn start:dev
   ```

2. Open GraphQL Playground in your browser: <br>
   `http://localhost:<PORT>/graphql`

3. From there, you can run queries and mutations interactively to test all API functionality, including recipes, comments, ratings, users, and feeds.

   This keeps it simple and directs developers to just run the server and open Playground without including queries.

## ⚡ Features

- **Users**
  - Sign up, sign in with JWT
  - Follow/unfollow other users
  - View top users by followers
- **Recipes**
  - CRUD operations
  - Ingredients and instructions
  - Ratings and comments
  - Average rating and comment count
- **Advanced Queries**
  - Recipes by ingredients (case-insensitive)
  - Recommended recipes based on user rating history
  - Personalized feed from followed users

---

## 🚀 Project Setup

```bash
# Clone repository
git clone https://github.com/kuldeep-shr/cookbook-connect-backend-nest.git
cd cookbook-connect-backend-nest

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Update DATABASE_URL, JWT_SECRET, etc.

# Run Prisma migrations and generate client
npx prisma migrate dev --name init
npx prisma generate

# Start development server
yarn start:dev





---

I can also **write a visual ER diagram** for this database schema and embed it into the README if you want it fully graphical for better understanding.

Do you want me to add the ER diagram?
```
