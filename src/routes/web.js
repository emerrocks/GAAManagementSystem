import express from 'express'
import homepageController from '../controllers/homepageController'
import auth from '../validation/authValidation'

const router = express.Router()

const initAllWebRoutes = (app) => {
  router.get('/', homepageController.getHomepage)
  router.get('/register', homepageController.getRegisterPage)
  router.get('/login', homepageController.getLoginPage)

  router.post('/register', auth.validateRegister, homepageController.handleRegister)
  router.get('/new-user', homepageController.getNewUserPage)
  router.post('/create-new-user', homepageController.createNewUser)
  return app.use('/', router)
}

module.exports = initAllWebRoutes
