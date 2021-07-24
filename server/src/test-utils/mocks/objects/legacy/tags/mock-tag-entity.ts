import { LegacyTagEntity } from '../../../../../shared/infra/db/entities/legacy/tag.entity'

const mockTagEntity = (id: string): LegacyTagEntity => {
  const tagEntity = new LegacyTagEntity()
  tagEntity.name = `Tag Name ${id}`
  return tagEntity
}

export { mockTagEntity }
