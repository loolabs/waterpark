import { useState, useMemo, Dispatch, SetStateAction } from 'react'
import Fuse from 'fuse.js'
import { indexData } from '../../utils'
import { Tag, TAGS } from '../../context'

export const useSearch = <T extends object>(
  items: Array<T>,
  keys: Array<string>,
  initialPattern: string = ''
): [
  Array<T>,
  Map<number, Tag>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<Map<number, Tag>>>
] => {
  const [searchValue, setSearchValue] = useState<string>(initialPattern)
  const [filters, setFilters] = useState<Map<number, Tag>>(indexData(TAGS))

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys,
      ignoreLocation: true, // doesn't weight string location
      threshold: 0.3, // 0=strict, 1=loose
    })
  }, [items, keys])

  // only fuzzy search on the items that match the selected tags
  const searchResult: Array<T> = searchValue
    ? fuse.search(searchValue).map(({ item }: Fuse.FuseResult<T>) => item)
    : items

  return [searchResult, filters, setSearchValue, setFilters]
}
