import express from 'express'
import { getAllEventsController } from '../../../application/use-cases/get-all-events'
const eventRouter = express.Router()

eventRouter.get('/', (req, res) => {
  getAllEventsController.execute(req, res)
})

export { eventRouter }
