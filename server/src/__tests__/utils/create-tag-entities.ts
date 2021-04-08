import { TagEntity } from '../../shared/infra/db/entities/tags/tag.entity'

export const createMockTagEntities = (): TagEntity[] => {
  const tags: Array<TagEntity> = []
  for (let i = 1; i <= 3; ++i) {
    const tagEntity = new TagEntity()
    tagEntity.name = `Tag Name ${i}`

    tags.push(tagEntity)
  }
  return tags
}
