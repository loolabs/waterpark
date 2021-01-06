import express from 'express'
import { JWTClaims } from '../../../../modules/users/domain/value-objects/jwt'

// it's ok for this request which lives on the `infra` level to depend on a value object which lives on the `domain` level
// dependencies can move inwards, but not outwards
export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims // TODO: where does this come from?? it doesn't live in req.body??
}
