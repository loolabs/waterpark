import { typexpress } from './shared'
import { api } from './waterpark'

// Example of how to use the typexpress router with a mock Waterpark API schema

const router = new typexpress.Router(api.v1)

router.get('/washrooms/', (_, res) => {
  res.json({
    washrooms: [
      {
        id: '1234',
        name: "MC 8th floor mens' bathroom",
      },
    ],
  })
})

router.get('/washrooms/:id/', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.json({
    washroom: {
      id: '1234',
      name: "MC 8th floor mens' bathroom",
    },
  })
})
