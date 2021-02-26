const checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

const checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

const postLogout = (req, res) => {
  req.session.destroy(function (error) {
    return res.redirect('/login')
  })
}

module.exports = {
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut,
  postLogout: postLogout,
}
