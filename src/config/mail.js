// const nodemailer = require('nodemailer')
import nodemailer from 'nodemailer'
import config from './config.js';
const MailTranspoter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
    },
});
export default MailTranspoter;