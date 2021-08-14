import { Schema, Get } from '../api'
import { PathParams } from 'express-serve-static-core'
import express from 'express'
import { TypedHandler, TypedRouter } from './types'

export class Router<API extends Schema.API> implements TypedRouter<API> {
  protected router: express.Router

  constructor(protected api: API, options?: express.RouterOptions) {
    this.router = express.Router(options)
  }

  public all<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'all'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.all(path, ...handlers)
    return this
  }

  public get<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'get'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.get(path, ...handlers)
    return this
  }

  public post<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'post'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.post(path, ...handlers)
    return this
  }

  public put<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'put'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.put(path, ...handlers)
    return this
  }

  public delete<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'delete'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.delete(path, ...handlers)
    return this
  }

  public patch<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'patch'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.patch(path, ...handlers)
    return this
  }

  public options<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'options'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.options(path, ...handlers)
    return this
  }

  public head<
    PathName extends Get.PathName<API> & PathParams,
    OperationName extends Get.OperationName<API, PathName> & 'head'
  >(path: PathName, ...handlers: Array<TypedHandler<API, PathName, OperationName>>): this {
    this.router.head(path, ...handlers)
    return this
  }

  // TODO: support Router.use

  // TODO: support Router.route
}
