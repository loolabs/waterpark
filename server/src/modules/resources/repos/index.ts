import { Washroom } from '../domain/entities/washroom'
import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity'
import { MockResourceRepo } from './mock-resource-repo'
import { WashroomMap } from '../mappers/washroom-map'
import { ResourceRepo } from './resource-repo'
import { MikroResourceRepo } from './mikro-resource-repo'
import { EntityRepository } from '@mikro-orm/core'

export { ResourceRepo, MockResourceRepo, MikroResourceRepo }

export type WashroomRepo = ResourceRepo<Washroom>
export class MockWashroomRepo extends MockResourceRepo<Washroom> {}
export class MikroWashroomRepo extends MikroResourceRepo<Washroom, WashroomEntity> {
  constructor(washroomEntityRepo: EntityRepository<WashroomEntity>) {
    super(washroomEntityRepo, WashroomMap)
  }
}
