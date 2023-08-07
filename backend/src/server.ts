import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import foodRouter from './routes/foods/food.router'
import usersRouter from './routes/users/user.router'
import { dbConnect } from './config/database.config';
import orderRouter from './routes/orders/order.router';

dbConnect();
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
}))

app.use('/api/foods', foodRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', orderRouter)

const port = 5000;
app.listen(port, () => {
    console.log("API rodando na porta http://localhost:" + port)
})