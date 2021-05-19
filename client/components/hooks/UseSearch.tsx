import { useState, useMemo, Dispatch, SetStateAction } from 'react'
import Fuse from 'fuse.js'

export const useSearch = <T extends object>(
  items: Array<T>,
  keys: Array<string>,
  initialPattern: string = ''
): [Array<T>, Dispatch<SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState<string>(initialPattern)

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys,
      ignoreLocation: true, // doesn't weight string location
      threshold: 0.3, // 0=strict, 1=loose
    })
  }, [items, keys])

  const searchResult: Array<T> = searchValue
    ? fuse.search(searchValue).map(({ item }: Fuse.FuseResult<T>) => item)
    : items

  return [searchResult, setSearchValue]
}
