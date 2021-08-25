import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../../../shared/infra/http/routes/decoded-request'

// TODO: just pass in the whole createRequest options object instead
const mockHandlerParams = (body?: any, params?: any) => {
  const req = httpMocks.createRequest({ body, params }) as DecodedExpressRequest
  const res = httpMocks.createResponse()

  return { req, res }
}

export { mockHandlerParams }
