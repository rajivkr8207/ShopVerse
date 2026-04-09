import { Router } from 'express'
import { Healthcheckcontroller } from '../controllers/HealthCheck.controlers.js'

const HealthRouter = Router()

HealthRouter.get('/health', Healthcheckcontroller)

export default HealthRouter