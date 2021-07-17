import { Schema, Get } from '../api'
import { PathParams } from 'express-serve-static-core'
import express from 'express'
import { TypedHandler, TypedRouter } from './types'

class TypedAPIError extends Error {}
class FrozenRouterError extends TypedAPIError {
  constructor() {
    super('Cannot modify a frozen router.')
  }
}
// @ts-ignore unused
class UnhandledPathError extends TypedAPIError {
  // TODO: add a check to the router to raise this error when appropriate
  constructor(unhandledPaths: Set<Schema.Path>) {
    const pathList = Array.from(unhandledPaths).join(', ')
    super(`Router cannot be frozen without handling the following paths: ${pathList}`)
  }
}

export class Router<Endpoint extends Schema.Endpoint> implements TypedRouter<Endpoint> {
  protected router: express.Router
  private frozen: boolean = false

  constructor(protected endpoint: Endpoint, options?: express.RouterOptions) {
    this.router = express.Router(options)
  }

  public freeze(): this {
    if (this.frozen) throw new FrozenRouterError()
    this.frozen = true
    return this
  }

  public all<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'all'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.all(path, ...handlers)
    return this
  }

  public get<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'get'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.get(path, ...handlers)
    return this
  }

  public post<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'post'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.post(path, ...handlers)
    return this
  }

  public put<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'put'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.put(path, ...handlers)
    return this
  }

  public delete<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'delete'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.delete(path, ...handlers)
    return this
  }

  public patch<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'patch'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.patch(path, ...handlers)
    return this
  }

  public options<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'options'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.options(path, ...handlers)
    return this
  }

  public head<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, 'head'>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    this.router.head(path, ...handlers)
    return this
  }

  public use<Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path> | Router<Get.Child<Endpoint, Path>>>
  ): this {
    if (this.frozen) throw new FrozenRouterError()
    const expressHandlers = handlers.map((handler) =>
      'router' in handler ? handler.freeze().router : handler
    )
    this.router.use(path, ...expressHandlers)
    return this
  }
}
