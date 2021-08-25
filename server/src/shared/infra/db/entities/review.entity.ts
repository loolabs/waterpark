import {
  AfterCreate,
  Entity,
  Enum,
  EventArgs,
  IdentifiedReference,
  ManyToOne,
  Property,
  Reference,
} from '@mikro-orm/core'
import { Faculty, Status } from '../../../../modules/reviews/domain/entities/review'
import { DomainEvents } from '../../../domain/events/domain-events'
import { UniqueEntityID } from '../../../domain/unique-entity-id'
import { BaseEntity } from './base.entity'
import { PlaceEntity } from './places/place.entity'

@Entity()
export class ReviewEntity extends BaseEntity {
  @ManyToOne({ entity: () => PlaceEntity, inversedBy: 'reviews', wrappedReference: true })
  place!: IdentifiedReference<PlaceEntity>

  @Property({ nullable: true, columnType: 'text' })
  comment?: string

  @Property({ columnType: 'text' })
  avatarImage!: string

  @Enum(() => Faculty)
  faculty!: Faculty

  @Enum(() => Status)
  status!: Status

  @Property({ nullable: true })
  affordabilityRating?: number

  @Property({ nullable: true })
  atmosphereRating?: number

  @Property({ nullable: true })
  cleanlinessRating?: number

  @Property({ nullable: true })
  managementRating?: number

  constructor(props: {
    place: PlaceEntity
    comment?: string
    user: {
      avatarImage: string
      faculty: Faculty
      status: Status
    }
    ratings: {
      affordability?: number
      atmosphere?: number
      cleanliness?: number
      management?: number
    }
  }) {
    super()
    const { place, comment, user, ratings } = props
    this.place = Reference.create(place)
    this.comment = comment
    this.avatarImage = user.avatarImage
    this.faculty = user.faculty
    this.status = user.status
    this.affordabilityRating = ratings.affordability
    this.atmosphereRating = ratings.atmosphere
    this.cleanlinessRating = ratings.cleanliness
    this.managementRating = ratings.management
  }

  @AfterCreate()
  afterCreate(target: EventArgs<ReviewEntity>) {
    const id = target.entity.id
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
