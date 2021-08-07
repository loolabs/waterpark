import {
  AfterCreate,
  Collection,
  Entity,
  EventArgs,
  LoadStrategy,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { DomainEvents } from '../../../../domain/events/domain-events';
import { UniqueEntityID } from '../../../../domain/unique-entity-id';
import { BaseEntity } from '../base.entity';
import { ReviewEntity } from '../reviews/review.entity';
import { TagEntity } from '../tag.entity';

@Entity()
export class PlaceEntity extends BaseEntity {
  @Property()
  name!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Property({ columnType: 'text' })
  address!: string;

  @Property({ columnType: 'text', nullable: true })
  url?: string;

  // TODO
  // @Property({ columnType: ??? })
  // location: Geography??

  @Property()
  onCampus!: boolean;

  @Property({ columnType: 'text' })
  bannerImage!: string;

  @Property({ columnType: 'text' })
  iconImage!: string;

  @ManyToMany({ entity: () => TagEntity, mappedBy: 'places', strategy: LoadStrategy.JOINED })
  tags = new Collection<TagEntity>(this);

  @OneToMany({ entity: () => ReviewEntity, mappedBy: 'place' })
  reviews = new Collection<ReviewEntity>(this);

  @AfterCreate()
  afterCreate(target: EventArgs<PlaceEntity>) {
    const id = target.entity.id;
    const aggregateId = new UniqueEntityID(id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
