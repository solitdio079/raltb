import { Router } from 'express'
import passport from 'passport'
import '../strategies/magic-link.mjs'

const router = Router()

router.get('/', (req, res) => {
  console.log('The main auth page!')
})

// Sending email requests and getting status messages
router.post(
  '/login/email',
  passport.authenticate('magiclink', {
    action: 'requestToken',
    failureMessage: 'Erreure!',
  }),
  (req, res) => {
    res.send({ msg: 'Email envoye!' })
  }
)

// verifying link send by email

router.get(
  '/login/email/verify',
  passport.authenticate('magiclink', {
    successReturnToOrRedirect: 'https://raltb.com/admin',
    failureMessage: 'Token Invalide!',
  })
)

// Get Login status

router.get('/login/status', (req, res) => {
  req.user ? res.send(req.user) : res.send({ msg: 'Vous n\'etes pas connecter' })
})

//logout
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.send({ msg: "Vous etes deconnecter!" })
  })
})
export default router
