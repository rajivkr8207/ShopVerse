import express from 'express'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error.middlewares.js'
import authrouter from './routes/auth.route.js'

const app = express()


app.use(express.json())
app.use(morgan('dev'))




app.use('/api/auth', authrouter)


app.use(errorMiddleware)
export default app