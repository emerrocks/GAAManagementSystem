import express from 'express'
import homepageController from '../controllers/homepageController'

const router = express.Router()

const initAllWebRoutes = (app) => {
  router.get('/', homepageController.getHomepage)
  router.get('/new-user', homepageController.getNewUserPage)
  router.post('/create-new-user', homepageController.createNewUser)
  return app.use('/', router)
}

module.exports = initAllWebRoutes
