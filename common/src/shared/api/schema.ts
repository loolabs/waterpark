import * as t from 'io-ts'
import { DeepReadonly } from 'ts-essentials'

// This module sets up a way to encode RESTful APIs as TypeScript objects.
// It is based vaguely on Swagger.

export namespace Schema {
  export type PathName = string

  export type OperationName =
    | 'all'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head'
  export function isOperationName(name: string): name is OperationName {
    return ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'].includes(name)
  }

  // TODO: support multiple responses (e.g. 200, 404)
  export interface Response {
    body?: t.Any
  }

  export interface Operation {
    pathParameters?: t.Any
    queryParameters?: t.Any
    requestBody?: t.Any
    response?: Response
  }
  export type Path = DeepReadonly<Partial<Record<OperationName, Operation>>>
  export type Paths = DeepReadonly<Partial<Record<PathName, Path>>>
  export type API = DeepReadonly<{
    paths: Paths
  }>
}
