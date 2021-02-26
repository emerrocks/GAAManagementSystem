//import sequelize 'db' to use the Models
import db from '../models'
import bcrypt from 'bcryptjs'
//find user by their email address
const findUserByEmail = (emailInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      //find email in users table
      const user = await db.User.findOne({
        where: {
          email: emailInput,
        },
      })
      if (!user) {
        reject(`We can't find a user with the email "${emailInput}"`)
      }
      resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}

//find users password
const comparePassword = (password, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      //compare plain user's password with hash password
      const isMatch = await bcrypt.compare(password, user.password)
      //if they match, ismatch is true
      if (isMatch) resolve(true)
      else {
        resolve('The password entered is incorrect. Please try again.')
      }
    } catch (e) {
      reject(e)
    }
  })
}

const findUserById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: idInput,
        },
      })
      if (!user) reject(`User not found by the id: "${idInput}"`)
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  findUserByEmail: findUserByEmail,
  comparePassword: comparePassword,
  findUserById: findUserById,
}
