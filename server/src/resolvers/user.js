import { tryLogin } from '../auth'

// TODO [RM] implement actual resolver to get detail user info
const getUser = async ({ id }) => ({ id, username: 'username', email: 'email' })

export default {
  Query: {
    getUser: (parent, { id }, { config }) => getUser({ id, config })
  },
  Mutation: {
    login: (parent, { email, password }, { config }) => tryLogin(email, password, config)
  }
}
