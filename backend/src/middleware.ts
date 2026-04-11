import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { config } from './config/config.js';
import { User } from './models/user.model.js';


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
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID!,
        clientSecret: config.CLIENT_SECRET!,
        callbackURL: "/api/v1/auth/google/callback"
    }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
            const email = profile.emails?.[0]?.value;

            if (!email) {
                return done(new Error("No email found"), null);
            }
            let user = await User.findOne({ email });

            if (!user) {
                user = await User.create({
                    fullname: profile.displayName,
                    email,
                    googleId: profile.id,
                    isVerified: true,
                    role: "buyer",
                    provider: "google"
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }))
    app.use(express.static('public'))
}