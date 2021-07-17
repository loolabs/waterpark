import { DeepReadonly } from 'ts-essentials'
import { Schema } from './schema'

function compiler<Base extends object>() {
  return function <T extends Base>(obj: T): DeepReadonly<T> {
    // No point calling Object.freeze, just let Typescript enforce the immutability
    return obj as DeepReadonly<T>
  }
}
export const Endpoint = compiler<Schema.Endpoint>()
export const API = compiler<Schema.API>()
