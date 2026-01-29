export const title = "Mini message board";
import db from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

const alphaErr = "characters must be alphanumeric";
const userLengthErr = "Username length must be between 1 and 25 characters";
const msgLengthErr = "Message length must be between 3 and 255 characters";
const validateMessage = [
	body("userName")
		.trim()
		.isAlphanumeric()
		.withMessage(`Username ${alphaErr}`)
		.isLength({ min: 1, max: 25 })
		.withMessage(userLengthErr),
	body("messageText")
		.isAlpha("en-US", { ignore: " " })
		.withMessage(`Message ${alphaErr}`)
		.isLength({ min: 3, max: 255 })
		.withMessage(msgLengthErr),
];

export const createMessage = [
	validateMessage,
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render("form", { title: title, errors: errors.array() });
				return;
			}
			const { userName, messageText } = matchedData(req);
			await db.createMessage(userName, messageText);
			res.redirect("/");
		} catch (error) {
			throw error;
		}
	},
];

export async function getMessage(req, res, next) {
	try {
		const data = await db.getMessage(req.params.id);
		const message = data[0];
		if (!message) {
			next();
			return;
		}
		res.render("details", { title: title, message: message });
	} catch (error) {
		throw error;
	}
}

export async function getIndex(req, res) {
	try {
		const messages = await db.getAllMessages();
		res.render("index", { title: title, messages: messages });
	} catch (error) {
		throw error;
	}
}

export function getForm(req, res) {
	try {
		res.render("form", { title: title });
	} catch (error) {
		throw error;
	}
}
