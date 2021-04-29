import {
  ChildOf,
  EndpointSchema,
  MethodName,
  MethodOf,
  MethodSchema,
  PathsOf,
  TypesOf,
} from './types'
import { PathParams, RequestHandler } from 'express-serve-static-core'
import express from 'express'

type TypedHandlerOf<
  Method extends MethodSchema,
  MethodType extends TypesOf<Method> = TypesOf<Method>
> = RequestHandler<
  MethodType extends { request: { parameters: {} } } ? MethodType['request']['parameters'] : {},
  MethodType extends { response: { body: {} } } ? MethodType['response']['body'] : {},
  MethodType extends { request: { body: {} } } ? MethodType['request']['body'] : {},
  MethodType extends { request: { query: {} } } ? MethodType['request']['query'] : {}
>

type TypedHandler<
  Endpoint extends EndpointSchema,
  P extends PathsOf<Endpoint> & PathParams,
  M extends MethodName
> = TypedHandlerOf<MethodOf<ChildOf<Endpoint, P>, M>>

interface TypedMatcher<Endpoint extends EndpointSchema, T, M extends MethodName> {
  <P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, M>>
  ): T
}

interface TypedRouter<Endpoint extends EndpointSchema> {
  all: TypedMatcher<Endpoint, this, 'all'>
  get: TypedMatcher<Endpoint, this, 'get'>
  post: TypedMatcher<Endpoint, this, 'post'>
  put: TypedMatcher<Endpoint, this, 'put'>
  delete: TypedMatcher<Endpoint, this, 'delete'>
  patch: TypedMatcher<Endpoint, this, 'patch'>
  options: TypedMatcher<Endpoint, this, 'options'>
  head: TypedMatcher<Endpoint, this, 'head'>
}

export class Router<Endpoint extends EndpointSchema> implements TypedRouter<Endpoint> {
  protected router = express.Router()

  constructor(protected endpoint: Endpoint) {}

  public all<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'all'>>
  ): this {
    this.router.all(path, ...handlers)
    return this
  }

  public get<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'get'>>
  ): this {
    this.router.get(path, ...handlers)
    return this
  }

  public post<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'post'>>
  ): this {
    this.router.post(path, ...handlers)
    return this
  }

  public put<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'put'>>
  ): this {
    this.router.put(path, ...handlers)
    return this
  }

  public delete<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'delete'>>
  ): this {
    this.router.delete(path, ...handlers)
    return this
  }

  public patch<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'patch'>>
  ): this {
    this.router.patch(path, ...handlers)
    return this
  }

  public options<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'options'>>
  ): this {
    this.router.options(path, ...handlers)
    return this
  }

  public head<P extends PathsOf<Endpoint> & PathParams>(
    path: P,
    ...handlers: Array<TypedHandler<Endpoint, P, 'head'>>
  ): this {
    this.router.head(path, ...handlers)
    return this
  }
}
