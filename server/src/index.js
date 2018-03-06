import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import cors from 'cors'
import jwt from 'jsonwebtoken'

import config from './config'
import { refreshTokens } from './auth'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express()

app.use(cors('*'))

const addUser = async (req, res, next) => {
  const token = req.headers['x-token']
  if (token) {
    try {
      const { user } = jwt.verify(token, config.SECRET)
      req.user = user
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token']
      const newTokens = await refreshTokens(token, refreshToken, config)
      if (newTokens.token && newTokens.refreshToken) {
        // send back to client new tokens
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        res.set('x-token', newTokens.token)
        res.set('x-refresh-token', newTokens.refreshToken)
      }
      req.user = newTokens.user
    }
  }
  next()
}

app.use(addUser) // middleware to add loggein user to the context

const graphqlEndpoint = '/graphql'

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      config,
      user: req.user
    }
  }))
)

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }))

app.listen(config.SERVER_PORT, err => !!err && console.log('Error starting server', err))

console.log(`Server started on port ${config.SERVER_PORT}`)
