import express from "express";
import serverless from "serverless-http";
import usersRoute from "../routes/users.js";
import contactsRoute from "../routes/contacts.js";
import { errorHandler } from "../middleware/errorHandler.js";
import connectDb from "../config/dbConnection.js";

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to DB only once
let isDbConnected = false;
const ensureDbConnection = async () => {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
};

// Register Routes
app.use(".netlify/functions/api/users", usersRoute);
app.use(".netlify/functions/api/contacts", contactsRoute);
app.use(errorHandler);

// Simple Hello World Route
app.get(".netlify/functions/api/hello", (req, res) => res.send("Hello World!"));

// Serverless handler
const handler = async (event, context) => {
  await ensureDbConnection(); // Ensure DB connects only once
  return serverless(app)(event, context);
};

export { handler };
