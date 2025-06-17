import { getDb } from "../db/db";
import { users } from "../db/schema";
import { type UserInsert, type UserSelect } from "../db/types";
import bcrypt from "bcrypt";
import {eq} from "drizzle-orm";
import { generateTokenService } from "./token";

export async function signupService(user: UserInsert) {
  try {
    const { email, name, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    await getDb().insert(users).values({ email, name, password: hashedPassword });

    return 1;

  } catch (error: any) {
    const errorConstraint = error.constraint || error.cause?.constraint || '';
    if (errorConstraint === "users_email_unique"){
      throw new Error("Email Already Exists");
    }
    throw error;
  }
}

export async function signinService(user: UserSelect) {
  try {
    const { email, password } = user;

    const userExists = await getDb().select().from(users).where(eq(users.email, email));

    if (!userExists.length) {
      throw new Error("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(password, userExists[0].password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const token = generateTokenService({ id: userExists[0].id })

    return token;
  } catch (error: any) {
    if (error.message === "User Not Found") {
      throw new Error("User Not Found");
    }
    if (error.message === "Invalid Credentials") {
      throw new Error("Invalid Credentials");
    }
    throw error;
  }
}
