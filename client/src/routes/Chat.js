import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Chat = ({ data: { customers = [] } }) => customers.map(u => <h1 key={u.id}>{u.email}</h1>)

const allCustomersQuery = gql`
  {
    customers {
      id
      email
    }
  }
`

export default graphql(allCustomersQuery)(Chat)
