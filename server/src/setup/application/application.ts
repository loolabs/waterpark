import { Repos } from '../db'
import { Controllers, setupControllers } from './controllers'
import { UseCases, setupUseCases } from './use-cases'

export interface Application {
  useCases: UseCases
  controllers: Controllers
}

export const setupApplication = (repos: Repos): Application => {
  const useCases = setupUseCases(repos)
  const controllers = setupControllers(useCases)

  return {
    useCases,
    controllers,
  }
}
