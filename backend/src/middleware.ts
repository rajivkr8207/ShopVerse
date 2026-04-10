import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import passport from 'passport';

export const Middleware = (app: express.Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }))
    app.use(passport.initialize());
    app.use(express.static('public'))
}