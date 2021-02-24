import express from 'express'
import { authenticate } from '../../../../../shared/infra/http/routes/authUtils'
import { createUserController } from '../../../application/use-cases/create-user'
import { loginUserController } from '../../../application/use-cases/login-user'
import { protectedUserController } from '../../../application/use-cases/protected-user'

const userRouter = express.Router()

// routes are coupled to controllers - no need for DI to enable easier testing, that's just overkill
userRouter.post('/', (req, res): void => {
  createUserController.execute(req, res)
})

// userRouter.get('/me', middleware.ensureAuthenticated(), (req, res) =>
//   getCurrentUserController.execute(req, res)
// )

userRouter.post('/login', (req, res) => {
  loginUserController.execute(req, res)
})

userRouter.get('/protected', (req, res) => {
  authenticate(req, res, protectedUserController)
})

// userRouter.post('/logout', middleware.ensureAuthenticated(), (req, res) =>
//   logoutController.execute(req, res)
// )

// userRouter.post('/token/refresh', (req, res) => refreshAccessTokenController.execute(req, res))

// userRouter.delete('/:userId', middleware.ensureAuthenticated(), (req, res) =>
//   deleteUserController.execute(req, res)
// )

// userRouter.get('/:username', middleware.ensureAuthenticated(), (req, res) =>
//   getUserByUserNameController.execute(req, res)
// )

export { userRouter }
