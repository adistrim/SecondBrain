import { getDb } from "../db/db";
import { tags } from "../db/schema";


export async function createTag(name: string) {
  try {
    await getDb().insert(tags).values({name})
    return 1;
  } catch (error: any) {
    const errorConstraint = error.constraint || error.cause?.constraint || '';
    if (errorConstraint === "tags_name_unique"){
      throw new Error("Tag Already Exists");
    }
    throw error;
  }
}


export async function getTags() {
  try {
    const response = await getDb().select().from(tags)
    return response;
  } catch (error: any) {
    throw error;
  }
}
