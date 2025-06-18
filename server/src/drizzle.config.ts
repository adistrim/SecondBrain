import type { Config } from 'drizzle-kit';
import { DB_URL } from "./config";

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    strict: true,
    dialect: 'postgresql',
    dbCredentials: {
      url: DB_URL,
    },
} satisfies Config;
