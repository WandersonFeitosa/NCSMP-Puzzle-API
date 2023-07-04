import { Router } from "express";
import cors from "cors";
import { TryController } from "../controllers/TryController";

const routes = Router();

routes.use(cors());

routes.post("/try", new TryController().try);
routes.get("/getDate", new TryController().getCompletionDate)

export default routes;
