import express from 'express'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error.middlewares.js'
import authrouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import sellerRouter from './routes/seller.route.js';
import adminrouter from './routes/admin.route.js';
import addressrouter from './routes/address.route.js';
const app = express()


app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.get('/', (req, res) => {
    res.status(200).send({
        message: "server is running properly"
    })
})


app.use('/api/auth', authrouter)
app.use('/api/seller', sellerRouter)
app.use('/api/admin', adminrouter)
app.use('/api/address', addressrouter)



app.use(errorMiddleware)
export default app