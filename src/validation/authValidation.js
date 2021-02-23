import { check } from 'express-validator'

const validateRegister = [
  check('email', 'Invalid email!').isEmail().trim(),
  check(
    'password',
    'Invalid password. Password must be at least 3 characters long.',
  ).isLength({ min: 3 }),
  check('confirmPassword', 'Passwords do not match.').custom(
    (value, { req }) => {
      return value === req.body.password
    },
  ),
]

module.exports = {
  validateRegister: validateRegister,
}
