import { eq } from "drizzle-orm";
import { db } from "..";

import { users } from "../schema";

export async function createUser(name: string) {
  try {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
  } catch (e) {
    const err = e as Error;
    const cause = err.cause ? `: ${(err.cause as Error).message}` : "";
    throw new Error(`error creating user: ${err.message}${cause}`);
  }
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}
