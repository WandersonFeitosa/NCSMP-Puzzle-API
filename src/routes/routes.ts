import { Router } from "express";
import cors from "cors";
import { AttemptController } from "../controllers/AttemptController";

const routes = Router();

routes.use(cors());

routes.post("/try", new AttemptController().attempt);
routes.get("/getDate", new AttemptController().getCompletionDate)

export default routes;
