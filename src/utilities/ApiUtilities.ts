<<<<<<< HEAD
import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Use a simple string secret
const JWT_SECRET: string = process.env.JWT_SECRET || "supersecretkey";

// Generate JWT token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "30d",
  });
};

// Hash password
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

// Verify JWT token
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
=======
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'SUPERSECRET';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: any) => {
  console.log('pay', payload);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
>>>>>>> cdd4c90 (refactor(core): restructure project into NestJS architecture)
};
