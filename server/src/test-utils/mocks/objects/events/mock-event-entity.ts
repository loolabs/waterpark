import { EventEntity } from '../../../../shared/infra/db/entities/event.entity'

const mockEventEntity = (id: string): EventEntity => {
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

export { mockEventEntity }
