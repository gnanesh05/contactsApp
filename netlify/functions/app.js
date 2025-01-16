import express from "express";
import serverless from "serverless-http";
import swaggerUI from "swagger-ui-express";
import contactsRoute from "../../routes/contacts.js";
import usersRoute from "../../routes/users.js";

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

//Swagger UI
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ContactsAPI",
      version: "1.0.0",
      description: "API documentation for ContactAPP",
    },
    servers: [
      {
        url: "https://contactsapi.netlify.app/.netlify/functions/app", // Replace with your Netlify deployment URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Indicates JSON Web Tokens
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply the scheme globally
      },
    ],
  },
  apis: ["../../routes/users.js", "../../routes/contacts.js"], // Include your routes here
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Define Routes
app.use("/api/contacts", contactsRoute);
app.use("/api/users", usersRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Simple Hello World Route
app.get("/hello", (req, res) => res.send("Hello World!"));

// Export the handler for Netlify
export const handler = serverless(app);
