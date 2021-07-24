import {
  AfterCreate,
  Collection,
  Entity,
  EventArgs,
  LoadStrategy,
  ManyToMany,
  Property,
  QueryOrder,
} from '@mikro-orm/core';
import { DomainEvents } from '../../../../domain/events/domain-events';
import { UniqueEntityID } from '../../../../domain/unique-entity-id';
import { BaseEntity } from '../base.entity';
import { EventEntity } from './event.entity';
import { LegacyTagEntity } from './tag.entity';

@Entity()
export class ClubEntity extends BaseEntity {
  @Property()
  name!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Property()
  size!: number;

  @Property({ columnType: 'text' })
  bannerImage!: string;

  @Property({ columnType: 'text' })
  iconImage!: string;

  @Property({ columnType: 'text', nullable: true })
  facebook?: string;

  @Property({ columnType: 'text', nullable: true })
  twitter?: string;

  @Property({ columnType: 'text', nullable: true })
  instagram?: string;

  @Property({ columnType: 'text', nullable: true })
  website?: string;

  @ManyToMany({
    entity: () => EventEntity,
    inversedBy: 'clubs',
    strategy: LoadStrategy.JOINED,
    orderBy: { startTime: QueryOrder.ASC_NULLS_LAST },
  })
  events = new Collection<EventEntity>(this);

  @ManyToMany({ entity: () => LegacyTagEntity, mappedBy: 'clubs', strategy: LoadStrategy.JOINED })
  tags = new Collection<LegacyTagEntity>(this);

  @AfterCreate()
  afterCreate(target: EventArgs<ClubEntity>) {
    const id = target.entity.id;
    const aggregateId = new UniqueEntityID(id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
