export const title = "Mini message board";
export const messages = [];

export function createMessage(req, res) {
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
		throw error;
	}
}

export function getMessage(req, res, next) {
	try {
		const message = messages.filter((msg) => msg.id === req.params.id)[0];
		if (!message) {
			next();
			return;
		}
		res.render("details", { title: title, message: message });
	} catch (error) {
		throw error;
	}
}

export function getIndex(req, res) {
	try {
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
