import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import indexRouter from "./routes/indexRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const assetsPath = path.join(__dirname, "public");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((req, res) => {
	res.status(404).render("404");
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Error 500 Internal Server Error");
});

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Server running on port ${PORT}`);
});
