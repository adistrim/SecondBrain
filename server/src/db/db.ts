import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DB_URL } from 'src/config';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    if (!DB_URL) {
      throw new Error('DB_URL environment variable is not set');
    }
    const pool = new Pool({ connectionString: DB_URL });
    dbInstance = drizzle(pool);
  }
  return dbInstance;
};
