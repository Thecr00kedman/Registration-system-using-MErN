import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connection from './db.js';
import userRoutes from './userRoutes.js'

const app= express();
const PORT=8000;

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(cookieParser())


app.use('/auth',userRoutes)
connection()

app.listen(PORT,()=> console.log(`server is running at port ${PORT}`))