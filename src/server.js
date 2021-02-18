require('dotenv').config()
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'

const app = express()

//config view Engine
configViewEngine(app)

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
