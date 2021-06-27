import { Schema, Get } from '../api'
import { PathParams } from 'express-serve-static-core'
import express from 'express'

type TypedHandlerForMethod<Method extends Schema.Method> = express.RequestHandler<
  Get.Request.Parameters<Method>,
  Get.Response.Body<Method>,
  Get.Request.Body<Method>,
  Get.Request.Query<Method>
>

export type TypedHandler<
  Endpoint extends Schema.Endpoint,
  Path extends Get.Path<Endpoint>,
  MethodName extends Schema.MethodName = Schema.MethodName
> = TypedHandlerForMethod<Get.ChildMethod<Endpoint, Path, MethodName>>

interface TypedMatcher<
  Endpoint extends Schema.Endpoint,
  ReturnType,
  MethodName extends Schema.MethodName = Schema.MethodName
> {
  <Path extends Get.Path<Endpoint> & PathParams>(
    path: Path,
    ...handlers: Array<TypedHandler<Endpoint, Path, MethodName>>
  ): ReturnType
}

export interface TypedRouter<Endpoint extends Schema.Endpoint> {
  all: TypedMatcher<Endpoint, this, 'all'>
  get: TypedMatcher<Endpoint, this, 'get'>
  post: TypedMatcher<Endpoint, this, 'post'>
  put: TypedMatcher<Endpoint, this, 'put'>
  delete: TypedMatcher<Endpoint, this, 'delete'>
  patch: TypedMatcher<Endpoint, this, 'patch'>
  options: TypedMatcher<Endpoint, this, 'options'>
  head: TypedMatcher<Endpoint, this, 'head'>
  use: TypedMatcher<Endpoint, this>
}
