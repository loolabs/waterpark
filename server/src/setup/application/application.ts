import { Application } from './types'
import { Repos } from '../database'
import { setupControllers } from './controllers'
import { setupUseCases } from './use-cases'

export const setupApplication = (repos: Repos): Application => {
  const useCases = setupUseCases(repos)
  const controllers = setupControllers(useCases)

  return {
    useCases,
    controllers,
  }
}
