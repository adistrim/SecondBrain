import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { content, link, tags, users } from "./schema";

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
export type TagsSelect = InferSelectModel<typeof tags>;
export type TagsInsert = InferInsertModel<typeof tags>;
export type ContentSelect = InferSelectModel<typeof content>;
export type ContentInsert = InferInsertModel<typeof content>;
export type LinkSelect = InferSelectModel<typeof link>;
export type LinkInsert = InferInsertModel<typeof link>;
