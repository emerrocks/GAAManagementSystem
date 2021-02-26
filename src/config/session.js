require('dotenv').config()

const Sequelize = require('sequelize')
const session = require('express-session')

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// connect to the database
const myDatabase = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    logging: false, //turn of query logging on console
    dialect: 'mysql',
    storage: './session.mysql',
  },
)

const sessionStore = new SequelizeStore({
  db: myDatabase,
})

const configSession = (app) => {
  app.use(
    session({
      key: 'express.sid',
      secret: 'secret',
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: { httpOnly: false, secure: false, maxAge: 24 * 60 * 60 * 1000 }, //1day
    }),
  )
}
// create the 'session' table in the database

sessionStore.sync()

module.exports = configSession
