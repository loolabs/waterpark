import moment from 'moment-timezone'
import { Club, Event } from '../../utils'

// TODO: remove these duplicated types from the backend with shared api types
export interface BasicEventDTO {
  name: string
  startTime: string
  endTime: string
  bannerImage?: string
  tags: Array<string>
}

export interface ClubDTO {
  name: string
  description: string
  links: {
    bannerImage: string
    iconImage: string
    facebook?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  tags: Array<string>
  events: Array<BasicEventDTO>
}

interface DeserializedClubsAndEvents {
  deserializedClubs: Array<Club>
  deserializedEvents: Array<Event>
}

export const deserializeClubsAndEvents = (
  serializedClubs: Array<ClubDTO> | undefined
): DeserializedClubsAndEvents => {
  if (!serializedClubs) {
    return {
      deserializedClubs: [],
      deserializedEvents: [],
    }
  }

  const deserializedEvents: Array<Event> = []

  const deserializedClubs = serializedClubs.map((club, clubId) => {
    return {
      ...club,
      id: clubId,
      events: club.events.map((event) => {
        const deserializedEvent = deserializeEvent(event, deserializedEvents.length, club)
        deserializedEvents.push(deserializedEvent)

        return deserializedEvent
      }),
    } as Club
  })

  return {
    deserializedClubs,
    deserializedEvents,
  }
}

const deserializeEvent = (
  serializedEvent: BasicEventDTO,
  eventId: number,
  club: ClubDTO
): Event => {
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return {
    ...serializedEvent,
    id: eventId,
    startTime: moment.tz(serializedEvent.startTime, 'Asia/Tokyo').local().tz(localZone),
    endTime: moment.tz(serializedEvent.endTime, 'Asia/Tokyo').local().tz(localZone),
    club: {
      name: club.name,
      iconURL: club.links.iconImage,
    },
  } as Event
}
