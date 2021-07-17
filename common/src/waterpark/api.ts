import * as t from 'io-ts'
import { API, Endpoint } from '../shared'
import * as dto from './dto'

export const clubsEndpoint = Endpoint({
  methods: {
    get: {
      response: {
        body: t.array(dto.tClub),
      },
    },
  },
})

export const eventsEndpoint = Endpoint({
  methods: {
    get: {
      response: {
        body: t.array(dto.tEvent),
      },
    },
  },
})

export const usersEndpoint = Endpoint({
  methods: {
    post: {
      request: {
        body: dto.tCreateUser,
      },
      response: {
        body: dto.tUser,
      },
    },
  },
})

export const v1API = API({
  root: {
    methods: {
      get: {
        request: {
          body: t.string,
        },
      },
    },
    children: {
      clubs: clubsEndpoint,
      events: eventsEndpoint,
      users: usersEndpoint,
    },
  },
})

export const versionedAPI = API({
  root: {
    children: {
      v1: v1API.root,
    },
  },
})
