import express from "express";
import serverless from "serverless-http";
import swaggerUI from "swagger-ui-express";
import contactsRoute from "../../routes/contacts.js";
import usersRoute from "../../routes/users.js";
import swaggerSpec from "../../swagger.js";

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Define Routes
app.use("/api/contacts", contactsRoute);
app.use("/api/users", usersRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Simple Hello World Route
app.get("/hello", (req, res) => res.send("Hello World!"));

// Export the handler for Netlify
export const handler = serverless(app);
