import db from '../models'
import bcrypt from 'bcryptjs'

const createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check the users email exists
      //return true if the email already exist in the database
      const isEmailExist = await checkUserEmail(user)
      if (isEmailExist) {
        reject(
          `This email "${user.email}" already exists. Please choose another email!`,
        )
      } else {
        //hash the users passowrd
        const salt = bcrypt.genSaltSync(10)
        //update the users password
        user.password = await bcrypt.hashSync(user.password, salt)
        //create a new user
        await db.User.create(user)
        resolve('done!')
      }
    } catch (e) {
      reject(e)
    }
  })
}

//function to check users email
const checkUserEmail = (userCheck) => {
  return new Promise(async (resolve, reject) => {
    try {
      //shortcut to find a record in the database
      const currentUser = await db.User.findOne({
        where: {
          email: userCheck.email,
        },
      })

      if (currentUser) resolve(true)
      resolve(false)
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createNewUser: createNewUser,
}
