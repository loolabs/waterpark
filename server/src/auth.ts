import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { JWT_SECRET } from './shared/core/secret'
import { authenticateUserUseCase } from './modules/users/application/use-cases/authenticate-user'
import { getUserUseCase } from './modules/users/application/use-cases/get-user'

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, cb) {
    return () => {
        authenticateUserUseCase.execute({email, password})
           .then(user => {
               if (!user) {
                   return cb(null, false);
               }
               return cb(null, user);
          })
          .catch(err => cb(err));
        }
    }
));

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: JWT_SECRET
}

passport.use(
    new Strategy(options, (payload, done) => {
      return getUserUseCase.execute(payload.id)
          .then(user => {
              return done(null, user);
          })
          .catch(err => {
              return done(err);
          });
    })
);