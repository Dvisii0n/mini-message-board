import { Router } from "express";

const indexRouter = Router();

const title = "Mini message board";

const messages = [];

function createMessage(req, res) {
	try {
		const messageText = req.body.messageText;
		const userName = req.body.userName;
		messages.push({
			id: crypto.randomUUID(),
			user: userName,
			text: messageText,
			added: new Date().toLocaleString(),
		});
		res.redirect("/");
	} catch (error) {
		res.status(500).send("Error 500 Internal server Error");
	}
}

function getMessage(req, res, next) {
	try {
		const message = messages.filter((msg) => msg.id === req.params.id)[0];
		if (!message) {
			next();
			return;
		}
		res.render("details", { title: title, message: message });
	} catch (error) {
		res.status(500).send("Error 500 Internal server Error");
	}
}

indexRouter.get("/", (req, res) => {
	res.render("index", { title: title, messages: messages });
});

indexRouter.get("/new", (req, res) => {
	res.render("form", { title: title });
});

indexRouter.post("/new", createMessage);

indexRouter.get("/details/:id", getMessage);

export default indexRouter;
