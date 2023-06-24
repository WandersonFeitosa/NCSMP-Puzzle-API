import { Router } from "express";
import cors from "cors";
import { TryController } from "../controllers/TryController";

const routes = Router();

routes.use(cors());

routes.post("/try", new TryController().try);

export default routes;
