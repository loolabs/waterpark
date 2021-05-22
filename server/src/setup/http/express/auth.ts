/*import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { JWT_SECRET } from '../../../shared/core/secret'
import { AuthenticateUserUseCase } from '../../../modules/users/application/use-cases/authenticate-user/authenticate-user-use-case'
import { getUserUseCase } from './modules/users/application/use-cases/get-user'

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, cb) {
    AuthenticateUserUseCase.execute({email, password})
        .then(result => {
            return cb(null, result);
        })
    }
));

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: JWT_SECRET
}

passport.use(
    new Strategy(options, 
    function(token, done) {
        getUserUseCase.execute({userId: token.userId})
        .then(result => {
            return done(null, result);
        })
    })
);
*/
