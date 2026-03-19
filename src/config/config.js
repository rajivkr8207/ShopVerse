import 'dotenv/config'


const config = {
    PORT: process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_EMAIL: process.env.MAIL_EMAIL,
    CORSORIGIN:process.env.CORSORIGIN,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_PASSWORD:process.env.REDIS_PASSWORD,
    LOG_DIR:process.env.LOG_DIR,
    IMAGE_KIT: process.env.IMAGE_KIT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // NODE_ENV: process.env.NODE_ENV,
    // NODE_ENV: process.env.NODE_ENV,
    // NODE_ENV: process.env.NODE_ENV,

}

export default config