import passport from 'passport'
import MagicLink from 'passport-magic-link'
import sendgrid from '@sendgrid/mail'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'

const MagicLinkStrategy = MagicLink.Strategy

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      var link =
        'https://api.raltb.com/auth/login/email/verify?token=' +
        token
      var msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Connectez-vous sur RALTB.com',
        text:
          'Salut! Cliquez sur le lien ci-dessous pour vous connecter sur RALTB.com\r\n\r\n' +
          link,
        html:
          '<h3>Salut!</h3><p>Cliquez sur le lien ci-dessous pour vous connecter sur RALTB.com</p><p><a href="' +
          link +
          '">Connectez-vous</a></p>',
      }
      return sendgrid.send(msg)
    },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          //const newUser = new Users({ email: user.email })
          //await newUser.save()
          return new Promise(function (resolve, reject) {
            return reject("Pas d'utilisateur")
          })
        }
       
          return new Promise(function (resolve, reject) {
            return resolve(check)
          })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user)
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})
