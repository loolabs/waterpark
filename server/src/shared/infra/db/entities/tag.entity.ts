import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { PlaceEntity } from './places/place.entity';

@Entity()
export class TagEntity extends BaseEntity {
  @Property()
  name!: string;

  @ManyToMany({ entity: () => PlaceEntity, inversedBy: 'tags' })
  places = new Collection<PlaceEntity>(this);
}
