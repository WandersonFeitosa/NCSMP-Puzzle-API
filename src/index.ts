import express from "express";
import routes from "./routes/routes";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";

const app = express();
app.use(express.json());
app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conectado ao banco de dados");
    startServer();
  })
  .catch((err) => {
    console.log(err);
  });
