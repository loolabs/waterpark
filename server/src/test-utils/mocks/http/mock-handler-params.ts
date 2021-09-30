import httpMocks from 'node-mocks-http'
import { DecodedExpressRequest } from '../../../shared/infra/http/routes/decoded-request'

type MockHandlerOptions = {
  request?: httpMocks.RequestOptions
  response?: httpMocks.ResponseOptions
}

export function mockHandlerParams({ request, response }: MockHandlerOptions = {}) {
  const req = httpMocks.createRequest(request) as DecodedExpressRequest
  const res = httpMocks.createResponse(response)

  return { req, res }
}
