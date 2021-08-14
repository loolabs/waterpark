import { Schema, Get } from '../api'
import { PathParams } from 'express-serve-static-core'
import express from 'express'

type TypedHandlerForOperation<Operation extends Schema.Operation> = express.RequestHandler<
  Get.PathParameters<Operation>,
  Get.ResponseBody<Operation>,
  Get.RequestBody<Operation>,
  Get.QueryParameters<Operation>
>

export type TypedHandler<
  API extends Schema.API,
  PathName extends Get.PathName<API>,
  OperationName extends Get.OperationName<API, PathName>
> = TypedHandlerForOperation<Get.Operation<API, PathName, OperationName>>

interface TypedMatcher<
  API extends Schema.API,
  ReturnType,
  OperationName extends Schema.OperationName = Schema.OperationName
> {
  <PathName extends Get.PathName<API> & PathParams>(
    path: PathName,
    ...handlers: Array<
      TypedHandler<API, PathName, OperationName & Get.OperationName<API, PathName>>
    >
  ): ReturnType
}

export interface TypedRouter<API extends Schema.API> {
  all: TypedMatcher<API, this, 'all'>
  get: TypedMatcher<API, this, 'get'>
  post: TypedMatcher<API, this, 'post'>
  put: TypedMatcher<API, this, 'put'>
  delete: TypedMatcher<API, this, 'delete'>
  patch: TypedMatcher<API, this, 'patch'>
  options: TypedMatcher<API, this, 'options'>
  head: TypedMatcher<API, this, 'head'>
  // use: TypedMatcher<API, this>
  // route: ??? (TODO)
}
