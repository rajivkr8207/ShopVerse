import express from "express"
import { Healthcheckcontroller } from "../controllers/HealthCheck.controlers.js"


const HealthRouter = express.Router()



HealthRouter.get('/health', Healthcheckcontroller)


export default HealthRouter