

Using [Neon](https://neon.tech/) for hosting the postgres database.

postgres version 17
ORM is [Drizzle](https://drizzle.io/)

I had to run this `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` SQL query in the `Neon SQL Editor` so that the UUID extension is available for generating unique identifiers. This is necessary to get the unique identifiers in the db tables.

