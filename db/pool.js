import { Pool } from "pg";
import { loadEnvFile } from "node:process";

loadEnvFile();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export default pool;
