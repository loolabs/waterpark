import {
  AfterCreate,
  Entity,
  EventArgs,
  LoadStrategy,
  OneToOne,
  PrimaryKeyType,
} from '@mikro-orm/core'
import { DomainEvents } from '../../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../../domain/unique-entity-id'
import { PlaceEntity } from './place.entity'

@Entity()
export class StudySpotEntity {
  [PrimaryKeyType]: PlaceEntity['id']

  @OneToOne({ primary: true, strategy: LoadStrategy.JOINED })
  place!: PlaceEntity

  @AfterCreate()
  afterCreate(target: EventArgs<StudySpotEntity>) {
    const id = target.entity.place.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
