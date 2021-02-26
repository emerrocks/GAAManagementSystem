require('dotenv').config()
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import configSession from './config/session'
const app = express()

//config view Engine
configViewEngine(app)

//config express cookie
app.use(cookieParser('secret'))

//show flash messages
app.use(connectFlash())

//config body-parser to post data
//json format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config app session
configSession(app)

//config passport middleware
app.use(passport.initialize())
app.use(passport.session())

//init all web routes
initWebRoutes(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`app is running at the port ${port}`)
})
