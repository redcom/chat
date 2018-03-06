// TODO [RM] implement actual resolver to get detail user info

const customers = [...Array(10)].map((c, idx) => ({ id: idx, email: `email${idx}@email.com` }))

const allCustomers = async () => [...customers]

export default {
  Query: {
    customers: (parent, args, { config }) => allCustomers({ ...args, config })
  }
}
