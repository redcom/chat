import { pick } from 'ramda'

// format errors in a nice readable way
export default (e, Error) => {
  if (e instanceof Error) {
    return e.errors.map(x => pick(['path', 'message'], x))
  }
  return [{ path: 'name', message: 'something went wrong' }]
}
