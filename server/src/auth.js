import jwt from 'jsonwebtoken'
import { pick } from 'ramda'

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: pick(['id', 'username'], user)
    },
    secret,
    {
      expiresIn: '1h'
    }
  )

  const createRefreshToken = jwt.sign(
    {
      user: pick(['id'], user)
    },
    secret2,
    {
      expiresIn: '7d'
    }
  )

  return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, config) => {
  let userId = 0
  try {
    const { user: { id } } = jwt.decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) {
    return {}
  }

  // TODO [RM] API Call
  const user = { id: 1 }

  if (!user) {
    return {}
  }

  // when user changes the password the refresh tocken will invalidate the next login
  const refreshSecret = user.password + config.SECRET2

  try {
    jwt.verify(refreshToken, refreshSecret)
  } catch (err) {
    return {}
  }

  const [newToken, newRefreshToken] = await createTokens(user, config.SECRET, refreshSecret)
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  }
}

export const tryLogin = async (email = '', password = '', config) => {
  // TODO [RM] replace this api call
  const user = await (email => {
    if (email === 'redcom+10@gmail.com') {
      return { id: 1, email, password, username: 'username' }
    }
    return false
  })(email)

  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Wrong email' }]
    }
  }

  // TODO [RM] Maybe Api Call
  const valid = await ((email, password) => {
    if (email === 'redcom+10@gmail.com' && password === 'password') {
      return true
    }
    return false
  })(email, password)

  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }]
    }
  }

  const refreshTokenSecret = user.password + config.SECRET2

  const [token, refreshToken] = await createTokens(user, config.SECRET, refreshTokenSecret)

  return {
    ok: true,
    token,
    refreshToken
  }
}
