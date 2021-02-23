require('dotenv').config()
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import cookieParser from 'cookie-parser'
import session from 'express-session'


const app = express()

//config view Engine
configViewEngine(app)

//config express cookie
app.use(cookieParser('secret'))

//config express session
app.use(session ({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //lasts one day
  }

}))

//show flash messages
app.use(connectFlash())

//config body-parser to post data
//json format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//init all web routes
initWebRoutes(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`app is running at the port ${port}`)
})
