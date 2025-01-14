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
        url: `http://localhost:${process.env.PORT}`, // Update server URL
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
  apis: ["./routes/users.js", "./routes/contacts.js"], // Include your routes here
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
