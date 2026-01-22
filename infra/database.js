import { Client } from "pg";

async function query(queryObject, values) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  try {
    // Suporta tanto query(string) quanto query(string, values)
    const result = values 
      ? await client.query(queryObject, values)
      : await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw para que o caller possa tratar
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};