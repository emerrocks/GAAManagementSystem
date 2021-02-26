import passport from 'passport'
import passportLocal from 'passport-local'
import loginService from '../../services/loginService'

const LocalStrategy = passportLocal.Strategy

//init the passport-local
const initPassportLocal = () => {
  //check the email and password on login
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        //exception handling
        try {
          //find user by their email address
          await loginService
            .findUserByEmail(email)
            .then(async (user) => {
              if (!user)
                return done(null, false, req.flash('errors', 'User not found!'))
              //compare the user's password
              const message = await loginService.comparePassword(password, user)
              if (message === true) {
                //the password was a match
                return done(null, user, null)
              } else {
                //return error message
                return done(null, false, req.flash('errors', message))
              }
            })
            .catch((err) => {
              console.log(err)
              return done(null, false, req.flash('errors', err))
            })
        } catch (error) {
          console.log(error)
          return done(null, false, error)
        }
      }, //async function to connect to database
    ),
  )
}

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  await loginService
    .findUserById(id)
    .then((user) => {
      return done(null, user)
    })
    .catch((error) => {
      console.log(error)
      return done(error, null)
    })
})
module.exports = initPassportLocal
