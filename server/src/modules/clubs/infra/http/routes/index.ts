import express from 'express'
import { getAllClubsController } from '../../../application/use-cases/get-all-clubs'
const clubRouter = express.Router()

clubRouter.get('/', (req, res) => {
  getAllClubsController.execute(req, res)
})


export { clubRouter }
