import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../routes/decoded-request'

const createHttpMock = (body?: any) => {
  const req = httpMocks.createRequest({ body }) as DecodedExpressRequest
  const res = httpMocks.createResponse()
  return { req, res }
}

export { createHttpMock }
