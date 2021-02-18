import userService from '../services/userService'

const getHomepage = (req, res) => {
  return res.render('homepage.ejs')
}

const getNewUserPage = (req, res) => {
  return res.render('createUsers.ejs')
}

const createNewUser = async (req, res) => {
  const user = req.body
  const message = await userService.createNewUser(user)
  console.log('This is create new user', message)
  return res.redirect('/')
}
module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createNewUser: createNewUser,
}
