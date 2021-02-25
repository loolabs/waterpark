import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import Fuse from 'fuse.js';

type SearchItemData = {
  name: string,
  description: string
}

export type SearchItem = { id: number } & SearchItemData;

export type SearchResult = (Fuse.FuseResult<SearchItem> | SearchItem)[];

type UseSearchReturn = [SearchResult, Dispatch<SetStateAction<string>>];

export const useSearch = (userInput: string, searchListData: Map<number, SearchItemData>): UseSearchReturn => {
  const [searchValue, setSearchValue] = useState<string>(userInput);

  const formattedSearchItems: SearchItem[] = useMemo(() => {
    return Array.from(searchListData.entries()).map(([id, info]) => {
      return ({
        id,
        name: info.name,
        description: info.description
      });
    });
  }, [searchListData]);

  const fuse = useMemo(() => {
    return new Fuse(formattedSearchItems, {
      keys: ["name"],
      ignoreLocation: true, // doesn't weight string location
      threshold: 0.3 // 0=strict, 1=loose
    })
  }, [formattedSearchItems])

  const filteredSearchItems: SearchResult = searchValue ? fuse.search(searchValue) : formattedSearchItems;
  
  return [filteredSearchItems, setSearchValue];
}
