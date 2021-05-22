import { RequestContext } from '@mikro-orm/core'
import express from 'express'
import { APIRouter, WebServer } from './types'
import { MikroORM } from '../../database'
import cors from 'cors'
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { JWT_SECRET } from '../../../shared/core/secret'
import { Controllers, UseCases } from '../../application/types'


interface BasicWebServerOptions {
  mikroORM?: MikroORM
}

const setupBasicWebServer = (apiRouter: APIRouter, _controllers: Controllers, useCases: UseCases, options: BasicWebServerOptions): WebServer => {
  const server = express()
  server.use(express.json())
  server.use(cors())

  const entityManager = options?.mikroORM?.em
  if (entityManager !== undefined) {
    server.use((_req, _res, next) => RequestContext.create(entityManager, next))
  }

  server.use('/api', apiRouter)

  passport.use(new LocalStrategy.Strategy({
      usernameField: 'email',
      passwordField: 'password',
  }, function (email, password, cb) {
      useCases.authUser.execute({email, password})
          .then(result => {
              return cb(null, result);
          })
      }
  ));

  const passportOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: JWT_SECRET
  }

  passport.use(
      new Strategy(passportOptions, 
      function(token, done) {
          useCases.getUser.execute({userId: token.userId})
          .then(result => {
              return done(null, result);
          })
      })
  );








  server.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  return server
}

export { BasicWebServerOptions, setupBasicWebServer }
