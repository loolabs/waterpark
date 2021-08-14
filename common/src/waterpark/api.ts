import * as t from 'io-ts'
import { Operation, API } from '../shared'
import * as dto from './dto'

export const getWashrooms = Operation({
  response: {
    body: t.strict({
      washrooms: t.array(dto.tWashroom),
    }),
  },
})

export const getWashroom = Operation({
  pathParameters: t.strict({
    id: t.string,
  }),
  response: {
    body: t.strict({
      washroom: dto.tWashroom,
    }),
  },
})

export const v1 = API({
  paths: {
    '/washrooms/': {
      get: getWashrooms,
    },
    '/washrooms/:id/': {
      get: getWashroom,
    },
  },
})
