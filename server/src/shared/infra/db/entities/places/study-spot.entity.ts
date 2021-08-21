import { AfterCreate, Entity, EventArgs } from '@mikro-orm/core'
import { DomainEvents } from '../../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../../domain/unique-entity-id'
import { BaseResourceEntity } from './place.entity'

@Entity()
export class StudySpotEntity extends BaseResourceEntity {
  @AfterCreate()
  afterCreate(target: EventArgs<StudySpotEntity>) {
    const id = target.entity.place.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
