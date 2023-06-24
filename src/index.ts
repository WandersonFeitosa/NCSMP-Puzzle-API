import express from "express";
import routes from "./routes/routes";

const path = require("path");

const app = express();
app.use(express.json());
app.use(routes);

// Middleware to serve files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
