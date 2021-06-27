import * as t from 'io-ts'
import { Schema } from './schema'

type Field<
  Base,
  T extends Base | undefined,
  K extends keyof Base,
  Fallback = undefined
> = T extends {
  [k in K]: Base[K]
}
  ? T[K]
  : Fallback
type TypeOf<T> = T extends t.Any ? t.TypeOf<T> : {}

export namespace Get {
  export type MethodName<Endpoint extends Schema.Endpoint> = Schema.MethodName &
    (Endpoint extends { methods: Schema.Methods } ? keyof Endpoint['methods'] : never)

  export function methodNames<Endpoint extends Schema.Endpoint>(
    endpoint: Endpoint
  ): Set<Get.MethodName<Endpoint>> {
    const methodNames = new Set<MethodName<Endpoint>>()
    if (endpoint.methods === undefined) return methodNames
    for (const key in endpoint.methods) {
      // Typescript isn't smart enough to figure this out on its own
      methodNames.add(key as MethodName<Endpoint>)
    }
    return methodNames
  }

  export type Path<Endpoint extends Schema.Endpoint> = Schema.Path &
    (Endpoint extends { methods: Schema.Methods }
      ? keyof Endpoint['children'] | Schema.RootPath
      : keyof Endpoint['children'])

  export function paths<Endpoint extends Schema.Endpoint>(endpoint: Endpoint): Set<Path<Endpoint>> {
    const paths = new Set<Get.Path<Endpoint>>()
    if (endpoint.children !== undefined) {
      for (const key in endpoint.children) {
        // Typescript isn't smart enough to figure this out on its own
        paths.add(key as Get.Path<Endpoint>)
      }
    }
    if (endpoint.methods !== undefined) {
      // Typescript isn't smart enough to figure this out on its own
      paths.add('/' as Get.Path<Endpoint>)
    }
    return paths
  }

  export type Method<
    Endpoint extends Schema.Endpoint,
    MethodName extends Schema.MethodName
  > = MethodName extends keyof Endpoint['methods'] ? Endpoint['methods'][MethodName] : never

  export type Child<
    Endpoint extends Schema.Endpoint,
    Path extends Get.Path<Endpoint>
  > = Path extends Schema.RootPath
    ? Endpoint
    : Path extends keyof Endpoint['children']
    ? Endpoint['children'][Path]
    : never

  export type ChildMethod<
    Endpoint extends Schema.Endpoint,
    Path extends Get.Path<Endpoint>,
    MethodName extends Schema.MethodName
  > = Get.Method<Get.Child<Endpoint, Path>, MethodName>

  export namespace Request {
    type Request<Method extends Schema.Method> = Field<Schema.Method, Method, 'request'>

    export type Parameters<Method extends Schema.Method> = TypeOf<
      Field<Schema.Request, Request<Method>, 'parameters'>
    >
    export type Query<Method extends Schema.Method> = TypeOf<
      Field<Schema.Request, Request<Method>, 'query'>
    >
    export type Body<Method extends Schema.Method> = TypeOf<
      Field<Schema.Request, Request<Method>, 'body'>
    >
  }

  export namespace Response {
    type Response<Method extends Schema.Method> = Field<Schema.Method, Method, 'response'>

    export type Body<Method extends Schema.Method> = TypeOf<
      Field<Schema.Request, Response<Method>, 'body'>
    >
  }
}
