import * as t from 'io-ts'
import { Router } from './express/router'

const tClub = t.strict({
  id: t.string,
  name: t.string,
})

const rootMethods = {
  get: {
    response: {
      body: t.literal('Water water water, loo loo loo'),
    },
  },
}

const clubsAPI = {
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
  },
}
const API = {
  methods: rootMethods,
  children: {
    '/clubs': clubsAPI,
  },
}

const clubsRouter = new Router(clubsAPI)

const router = new Router(API)

router.get('/clubs', (req, res) => {
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
router.get('/', (req, res) => {
  // Argument of type '"hi"' is not assignable to parameter of type '"Water water water, loo loo loo"'.
  // res.json('hi')
  res.json('Water water water, loo loo loo')
})

// This doesn't work because our router is meant for the base endpoint, not the '/clubs' endpoint
// router.use('/clubs', router)
// This works though!
router.use('/clubs', clubsRouter)

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
