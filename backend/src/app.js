import express from 'express'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error.middlewares.js'
import authrouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import sellerRouter from './routes/seller.route.js';
import adminrouter from './routes/admin.route.js';
import addressrouter from './routes/address.route.js';
import Categoryrouter from './routes/category.route.js';
import Productrouter from './routes/product.route.js';
import Cartrouter from './routes/cart.route.js';
import Orderrouter from './routes/order.route.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from './config/config.js';
import jwt from 'jsonwebtoken';
import Usermodel from './models/user.model.js';
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: `${config.CORSORIGIN.replace('3000', '8000')}/api/auth/google/callback`,
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await Usermodel.findOne({ email });

        if (user) {
            if (user.provider === "local") {
                return done(null, false, { message: "Account already exists with email/password." });
            }
            return done(null, user);
        }

        user = await Usermodel.create({
            fullname: profile.displayName,
            email: email,
            profileImage: profile.photos[0]?.value,
            provider: "google",
            isverify: true,
            role: "USER"
        });

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));


app.get('/', (req, res) => {
    res.status(200).send({
        message: "server is running properly"
    })
})


app.use('/api/auth', authrouter)
app.use('/api/seller', sellerRouter)
app.use('/api/admin', adminrouter)
app.use('/api/address', addressrouter)
app.use('/api/category', Categoryrouter)
app.use('/api/product', Productrouter)
app.use('/api/cart', Cartrouter)
app.use('/api/order', Orderrouter)

app.use(errorMiddleware)
export default app