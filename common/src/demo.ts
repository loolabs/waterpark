import * as t from 'io-ts'
import { Router } from './express'

const tClub = t.strict({
  id: t.string,
  name: t.string,
})

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
  methods: {
    get: {
      response: {
        body: t.literal('Water water water, loo loo loo'),
      },
    },
  },
  children: {
    '/clubs': clubsAPI,
  },
}

const router = new Router(API)

router.get('/clubs', (req, res) => {
  // @ts-ignore
  const { category } = req.query // Typescript knows that this is a string!

  // res.json(['Typescript does not allow us to send a response of this incorrect type'])
  res.json([
    {
      id: 'abcd',
      name: 'mathNEWS',
    },
  ])
})

// @ts-ignore
router.get('/', (req, res) => {
  // Argument of type '"hi"' is not assignable to parameter of type '"Water water water, loo loo loo"'.
  // res.json('hi')
})
