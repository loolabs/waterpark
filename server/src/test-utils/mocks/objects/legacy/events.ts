import { UniqueEntityID } from './../../../../shared/domain/unique-entity-id'
import { Event } from '../../../../modules/legacy/events/domain/entities/event'
import { EventDTO } from '../../../../modules/legacy/events/mappers/event-dto'
import { EventEntity } from '../../../../shared/infra/db/entities/legacy/event.entity'

export const mockEvent = (id: string): Event => {
  const eventResult = Event.create(
    {
      name: `Event Name ${id}`,
      description: `Event Description ${id}`,
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
      links: {
        url: `Event URL ${id}`,
        bannerImage: `Banner Image ${id}`,
        facebook: `Facebook ${id}`,
        twitter: `Twitter ${id}`,
        instagram: `Instagram ${id}`,
      },
      tags: ['tag1', 'tag2', 'tag3'],
      clubs: [{ id: new UniqueEntityID(id), name: 'Club Name 1', iconImage: '' }],
    },
    new UniqueEntityID(id)
  )

  if (eventResult.isErr()) throw eventResult.error
  return eventResult.value
}

export const mockEventDTO = (id: string): EventDTO => {
  return {
    id: id,
    name: `Event Name ${id}`,
    description: `Event Description ${id}`,
    links: {
      url: `Event URL ${id}`,
      bannerImage: `Banner Image ${id}`,
      facebook: `Facebook ${id}`,
      twitter: `Twitter ${id}`,
      instagram: `Instagram ${id}`,
    },
    startTime: '2021-01-01T00:00:00.000Z',
    endTime: '2021-01-01T00:00:00.000Z',
    tags: ['tag1', 'tag2', 'tag3'],
    clubs: [{ id: id, name: 'Club Name 1', iconImage: '' }],
  }
}

export const mockEventEntity = (id: string): EventEntity => {
  const eventEntity = new EventEntity()
  eventEntity.name = `Event Name ${id}`
  eventEntity.description = `Event Description ${id}`
  eventEntity.url = `Event URL ${id}`
  eventEntity.bannerImage = `Event Banner ${id}`
  eventEntity.startTime = new Date(`2021-0${id}-01T00:00:00.000Z`)
  eventEntity.endTime = new Date(`2021-0${id}-01T00:00:00.000Z`)
  eventEntity.facebook = `Facebook ${id}`
  eventEntity.twitter = `Twitter ${id}`
  eventEntity.instagram = `Instagram ${id}`
  return eventEntity
}
