import { Router } from "express";
import {
	createMessage,
	getForm,
	getIndex,
	getMessage,
} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getIndex);

indexRouter.get("/new", getForm);

indexRouter.post("/new", createMessage);

indexRouter.get("/details/:id", getMessage);

export default indexRouter;
