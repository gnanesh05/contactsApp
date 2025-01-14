import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import contactsRoute from './routes/contacts.js'
import usersRoute from './routes/users.js'
import { errorHandler } from './middleware/errorHandler.js';
import connectDb from './config/dbConnection.js';
const PORT = process.env.PORT;

const app = express();

app.use(express.json())  
app.use("/api/contacts",contactsRoute);
app.use("/api/users", usersRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorHandler);

app.listen(PORT,()=>{
    connectDb()
    console.log(`server running at ${PORT}`)
})