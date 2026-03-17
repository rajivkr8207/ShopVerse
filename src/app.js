import express from 'express'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error.middlewares.js'
import authrouter from './routes/auth.route.js'
import  cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express()


app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))



app.use('/api/auth', authrouter)


app.use(errorMiddleware)
export default app