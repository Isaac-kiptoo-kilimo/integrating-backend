import express from "express";

import * as dotenv from 'dotenv';
import noteRouter from "./routes/notebookRoutes";
import cors from "cors";

const app=express();

dotenv.config();

app.use(express.json());
app.use(cors())

app.use('/notes', noteRouter);


const port=process.env.PORT || 5000
app.listen(port, ()=>console.log(`This App is running on Port: ${port}`));


