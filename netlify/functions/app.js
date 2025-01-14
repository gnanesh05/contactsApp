import express, { Router } from "express";
import serverless from "serverless-http";
import swaggerUI from 'swagger-ui-express'
import contactsRoute from '../../routes/contacts.js'
import usersRoute from '../../routes/users.js'
import swaggerSpec from "../../swagger.js";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// api.use("/api/", router);
app.use(express.json())  
app.use("/api/contacts",contactsRoute);
app.use("/api/users", usersRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorHandler);


export const handler = serverless(api);
