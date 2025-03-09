import express from "express";
import serverless from "serverless-http";
import usersRoute from "../routes/users.js";
import contactsRoute from "../routes/contacts.js";
import { errorHandler } from "../middleware/errorHandler.js";
import connectDb from "../config/dbConnection.js";

// Initialize Express app
const app = express();
app.use(express.json());

console.log("Starting Express app...");

let isDbConnected = false;
const ensureDbConnection = async () => {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
};

ensureDbConnection();

app.get("/.netlify/functions/api/hello", (req, res) => {
  console.log("Hello route was hit");
  res.json({ message: "Hello World!" });
});
app.use("/.netlify/functions/api/users", usersRoute);
app.use("/.netlify/functions/api/contacts", contactsRoute);
app.use(errorHandler);


export const handler = serverless(app);
