import { useSearch } from '../hooks'
import { TAGS, Tag, TagGroup, TagRow, TagBubble } from './Tag'
import { House, Id } from '../../utils'
import { useMemo } from 'react'
import styled from 'styled-components'
import { HouseCard } from './HouseCard'
import { PageTitle } from '../../styles'
import { SearchInput } from '../SearchInput'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

const smallerThan = (size: string): string => `(max-width: ${size})`
const largerThan = (size: string): string => `(min-width: ${size})`

const HouseListPage = styled.div`
  margin-top: 65px;
  margin-bottom: 24px;
`

const HouseListGrid = styled.div`
  display: grid;
  grid-gap: 16px;
  justify-content: center;

  // Expand the number of columns with the width of the screen
  grid-template-columns: repeat(1, minmax(150px, 450px));
  margin-left: 12px;
  margin-right: 12px;
  @media ${largerThan(tablet)} and ${smallerThan(laptop)} {
    grid-template-columns: repeat(2, minmax(300px, 450px));
    margin-left: 24px;
    margin-right: 24px;
  }
  @media ${largerThan(laptop)} {
    margin: auto;
    max-width: 80%;
    grid-template-columns: 450px repeat(auto-fit, 450px);
  }
`

const HouseListHeaderContainer = styled.div`
  // Use both ways of making things full-width because CSS can't be trusted
  column-span: all;
  grid-column: 1/-1;

  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  // Shrink the page's "forehead" on mobile
  gap: 8px;
  margin-top: max(48px, 5vh);
  @media ${largerThan(tablet)} {
    gap: 16px;
    margin-top: 10vh;
  }
`

const HouseListTitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 64px;
`

const HouseListTitle = styled(PageTitle)`
  margin: 0;
  white-space: nowrap;
`

const RightSpaceWrapper = styled.div`
  padding-right: 16px;
  margin-right: auto;
`

interface HouseListHeaderProps {
  onSearch: (search: string) => any
}

interface HouseListTagsProps {
  tags: Array<Tag>
}

const HouseListTags = ({ tags }: HouseListTagsProps) => {
  return (
    <TagRow>
      <TagGroup>
        {tags.map(({ text, colour }) => (
          <RightSpaceWrapper key={text}>
            <TagBubble colour={colour} highlightOnHover>
              {text}
            </TagBubble>
          </RightSpaceWrapper>
        ))}
      </TagGroup>
      <TagBubble borderStyle="dashed" borderWidth="2px">
        + More
      </TagBubble>
    </TagRow>
  )
}

const HouseListHeader = ({ onSearch }: HouseListHeaderProps) => {
  return (
    <HouseListHeaderContainer>
      <HouseListTitleRow>
        <HouseListTitle>Explore Houses</HouseListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </HouseListTitleRow>
      <HouseListTags tags={Array.from(TAGS.values())}></HouseListTags>
    </HouseListHeaderContainer>
  )
}

interface HouseListProps {
  houses: Map<Id, House>
}

export const HousingList = ({ houses }: HouseListProps) => {
  const allHouses: Array<House> = useMemo(() => Array.from(houses.values()), [houses])

  const [filteredHouses, setSearchValue] = useSearch(allHouses, ['name'])

  return (
    <HouseListPage>
      <HouseListGrid>
        <HouseListHeader onSearch={setSearchValue} />
        {filteredHouses.map((House) => (
          <HouseCard key={House.id} House={House} />
        ))}
      </HouseListGrid>
    </HouseListPage>
  )
}
