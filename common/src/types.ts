import * as t from 'io-ts'

export interface RequestSchema {
  readonly parameters?: t.Any
  readonly query?: t.Any
  readonly body?: t.Any
}
export interface ResponseSchema {
  readonly body?: t.Any
}
export interface MethodSchema {
  readonly request?: RequestSchema
  readonly response?: ResponseSchema
}

export type MethodName = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
export type RootPath = '/'
export type ChildPath = `/${string}`

type Methods = Readonly<Partial<Record<MethodName, MethodSchema>>>
type Children = Readonly<Partial<Record<Exclude<ChildPath, RootPath>, EndpointSchema>>>
export interface EndpointSchema extends Methods {
  readonly methods?: Methods
  readonly children?: Children
}

export type MethodOf<
  Endpoint extends EndpointSchema,
  M extends MethodName
> = M extends keyof Endpoint['methods'] ? Endpoint['methods'][M] : never

export type PathsOf<Endpoint extends EndpointSchema> = Endpoint extends { methods: Methods }
  ? keyof Endpoint['children'] | RootPath
  : keyof Endpoint['children']

export type ChildOf<
  Endpoint extends EndpointSchema,
  P extends PathsOf<Endpoint>
> = P extends RootPath
  ? Endpoint
  : P extends keyof Endpoint['children']
  ? Endpoint['children'][P]
  : never

export type TypesOf<Method extends MethodSchema> = {
  readonly [K in keyof Method]-?: {
    readonly [KK in keyof Method[K]]-?: t.TypeOf<Method[K][KK]>
  }
}
