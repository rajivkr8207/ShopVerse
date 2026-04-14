import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware.js'
import HealthRouter from './routes/healthcheck.route.js'
import AuthRouter from './routes/auth.route.js'
import PasswordResetRouter from './routes/passwordReset.route.js'
import { Middleware } from './middleware.js'
import CategoryRouter from './routes/category.route.js'
import ProductRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'


const app = express()


Middleware(app)


app.get('/', (req, res) => {
    res.send("hello world")
})



import ProductVariantRouter from './routes/productVariant.routes.js'

app.use('/api/v1', HealthRouter)
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/category', CategoryRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1/product-variant', ProductVariantRouter)
app.use('/api/v1/password-reset', PasswordResetRouter)
app.use(errorMiddleware);

export default app