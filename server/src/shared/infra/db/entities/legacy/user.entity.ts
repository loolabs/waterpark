import { AfterCreate, Entity, EventArgs, Property } from '@mikro-orm/core';
import { DomainEvents } from '../../../../domain/events/domain-events';
import { UniqueEntityID } from '../../../../domain/unique-entity-id';
import { BaseEntity } from '../base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ default: false })
  emailVerified!: boolean;

  @Property({ default: false })
  isDeleted!: boolean;

  @Property()
  accessToken?: string;

  @Property()
  refreshToken?: string;

  @Property()
  lastLogin?: Date;

  @AfterCreate()
  afterCreate(target: EventArgs<UserEntity>) {
    const id = target.entity.id;
    const aggregateId = new UniqueEntityID(id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
