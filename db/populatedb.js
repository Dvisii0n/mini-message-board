import { Client } from "pg";
import { loadEnvFile } from "node:process";

// const SQL = `
// 	CREATE TABLE IF NOT EXISTS messages (
// 		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
// 		username VARCHAR(25),
// 		text TEXT,
// 		added DATE
// 	);
// `;

async function main() {
	console.log("seeding...");
	loadEnvFile();
	console.log(process.env.DATABASE_URL);
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});
	await client.connect();
	console.log("connected to database");
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();
