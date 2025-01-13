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
        url: `http://localhost:${process.env.PORT}`, // Change this to your server URL
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // Apply the security globally to all routes requiring it
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ["./routes/users.js", "./routes/contacts.js"], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;