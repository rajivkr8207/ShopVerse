import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware.js'
import HealthRouter from './routes/healthcheck.route.js'
import { Middleware } from './middleware.js'
import AuthRouter from './routes/auth.route.js'


const app = express()


Middleware(app)


app.get('/', (req, res) => {
    res.send("hello world")
})




app.use('/api/v1', HealthRouter)
app.use('/api/v1/auth', AuthRouter)

app.use(errorMiddleware);

export default app