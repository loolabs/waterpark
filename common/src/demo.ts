import * as t from 'io-ts'
import { typexpress } from './shared'
import { API, Endpoint } from './shared/api'

const tClub = t.strict({
  id: t.string,
  name: t.string,
})

const clubsEndpoint = Endpoint({
  methods: {
    get: {
      request: {
        query: t.strict({
          category: t.string,
        }),
      },
      response: {
        body: t.array(tClub),
      },
    },
    // not allowed because we can no longer pass the object into Endpoint
    // post: 'Hi'
  },
})

const rootEndpoint = Endpoint({
  methods: {
    get: {
      response: {
        body: t.literal('Water water water, loo loo loo'),
      },
    },
  },
  children: {
    '/clubs': clubsEndpoint,
  },
})

export const api = API({
  root: rootEndpoint,
})

// We can't do this, because `API` makes things immutable
// clubsEndpoint.methods.get.request.query = t.string

const clubsRouter = new typexpress.Router(clubsEndpoint)
const rootRouter = new typexpress.Router(rootEndpoint)

rootRouter.get('/clubs', (req, res) => {
  const { category } = req.query // Typescript knows that this is a string!
  console.log(category.length)

  // res.json(['Typescript does not allow us to send a response of this incorrect type'])
  res.json([
    {
      id: 'abcd',
      name: 'mathNEWS',
    },
  ])
})

// @ts-ignore unused
rootRouter.get('/', (req, res) => {
  // Argument of type '"hi"' is not assignable to parameter of type '"Water water water, loo loo loo"'.
  // res.json('hi')
  res.json('Water water water, loo loo loo')
})

// This doesn't work because our router is meant for the base endpoint, not the '/clubs' endpoint
// router.use('/clubs', router)
// This works though!
rootRouter.use('/clubs', clubsRouter)

// This should raise a run-time error because the clubsRouter is frozen
// TODO: check if it does
clubsRouter.get('/', (req, res) => {
  console.log(req.query.category.length)
  res.json([
    {
      id: 'efgh',
      name: 'Loo Labs',
    },
  ])
})
