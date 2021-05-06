import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../../../shared/infra/http/routes/decoded-request'

const mockHandlerParams = (body?: any) => {
  const req = httpMocks.createRequest({ body }) as DecodedExpressRequest
  const res = httpMocks.createResponse()

  return { req, res }
}

export { mockHandlerParams }
