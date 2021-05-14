import { TagEntity } from '../../../../shared/infra/db/entities/tags/tag.entity'

const mockTagEntity = (id: string): TagEntity => {
  const tagEntity = new TagEntity()
  tagEntity.name = `Tag Name ${id}`
  return tagEntity
}

export { mockTagEntity }
