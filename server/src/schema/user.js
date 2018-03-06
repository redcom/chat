export default `

  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    getUser(id: Int!): User!
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`
