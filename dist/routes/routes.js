"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const AttemptController_1 = require("../controllers/AttemptController");
const routes = (0, express_1.Router)();
routes.use((0, cors_1.default)());
routes.post("/try", new AttemptController_1.AttemptController().attempt);
routes.get("/getDate", new AttemptController_1.AttemptController().getCompletionDate);
exports.default = routes;
