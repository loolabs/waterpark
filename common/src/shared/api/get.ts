import * as t from 'io-ts'
import { Schema } from './schema'

type TypeOf<T> = T extends t.Any ? t.TypeOf<T> : {}

export namespace Get {
  export type PathName<API extends Schema.API> = keyof API['paths']

  export type Path<
    API extends Schema.API,
    PathName extends Get.PathName<API>
  > = API['paths'][PathName]

  export type OperationName<
    API extends Schema.API,
    PathName extends Get.PathName<API>
  > = keyof Get.Path<API, PathName>

  export type Operation<
    API extends Schema.API,
    PathName extends Get.PathName<API>,
    OperationName extends Get.OperationName<API, PathName>
  > = Get.Path<API, PathName>[OperationName]

  export type PathParameters<Operation extends Schema.Operation> = TypeOf<
    Operation['pathParameters']
  >
  export type QueryParameters<Operation extends Schema.Operation> = TypeOf<
    Operation['queryParameters']
  >
  export type RequestBody<Operation extends Schema.Operation> = TypeOf<Operation['requestBody']>

  export type ResponseBody<Operation extends Schema.Operation> = TypeOf<
    Operation['response'] extends Schema.Response ? Operation['response']['body'] : undefined
  >
}
