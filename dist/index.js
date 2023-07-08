"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
mongoose_1.default
    .connect(dbURI)
    .then(() => {
    console.log("Conectado ao banco de dados");
    startServer();
})
    .catch((err) => {
    console.log(err);
});
