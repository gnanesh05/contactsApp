import express from 'express'
import contactsRoute from './routes/contacts.js'
import usersRoute from './routes/users.js'
import { errorHandler } from './middleware/errorHandler.js';
import connectDb from './config/dbConnection.js';
const PORT = process.env.PORT;

const app = express();

app.use(express.json())
app.use("/api/contacts",contactsRoute);
app.use("/api/users", usersRoute);
app.use(errorHandler);

app.listen(PORT,()=>{
    connectDb()
    console.log(`server running at ${PORT}`)
})