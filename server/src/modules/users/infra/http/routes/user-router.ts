import { Router } from 'express'
import { CreateUserController } from '../../../application/use-cases/create-user/create-user-controller'

class UserRouter {
  static using(createUserController: CreateUserController): Router {
    const userRouter = Router()

    // routes are coupled to controllers - no need for DI to enable easier testing, that's just overkill
    userRouter.post('/', (req, res): void => {
      createUserController.execute(req, res)
    })

    // userRouter.get('/me', middleware.ensureAuthenticated(), (req, res) =>
    //   getCurrentUserController.execute(req, res)
    // )

    // userRouter.post('/login', (req, res) => loginController.execute(req, res))

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

    return userRouter
  }
}

export { UserRouter }
