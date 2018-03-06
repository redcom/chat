export default `

  type Customer {
    id: Int!
    email: String!
  }

  type Query {
    customers: [Customer!]!
  }
`
