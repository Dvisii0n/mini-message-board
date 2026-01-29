import pool from "./pool.js";

async function createMessage(username, text) {
	await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
		username,
		text,
	]);
}

async function getAllMessages() {
	const { rows } = await pool.query(
		"SELECT id, username, text, to_char(messages.added, 'YYYY-MM-DD') AS added FROM messages",
	);
	return rows;
}

async function getMessage(messageId) {
	const { rows } = await pool.query("SELECT * FROM messages WHERE id= $1", [
		messageId,
	]);
	return rows;
}

export default { createMessage, getAllMessages, getMessage };
