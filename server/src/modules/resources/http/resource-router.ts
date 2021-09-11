import { Router } from 'express'
import { GetAllResourcesController } from '../use-cases/get-all-resources'
import { GetResourceByIdController } from '../use-cases/get-resource-by-id'

export class ResourceRouter {
  static using<Resource, ResourceDTO>(
    getAllResourcesController: GetAllResourcesController<Resource, ResourceDTO>,
    getResourceByIdController: GetResourceByIdController<Resource, ResourceDTO>
  ): Router {
    const resourceRouter = Router()
    resourceRouter.get('/', (req, res) => {
      getAllResourcesController.execute(req, res)
    })
    resourceRouter.get('/:id', (req, res) => {
      getResourceByIdController.execute(req, res)
    })
    return resourceRouter
  }
}
