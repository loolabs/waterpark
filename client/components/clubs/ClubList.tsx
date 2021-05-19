import { useSearch } from '../hooks'
import { TAGS, Tag, TagGroup, TagRow, TagBubble } from './Tag'
import { Club, Id } from '../../utils'
import { useMemo } from 'react'
import styled from 'styled-components'
import { ClubCard } from './ClubCard'
import { PageTitle } from '../../styles'
import { SearchInput } from './SearchInput'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

const smallerThan = (size: string): string => `(max-width: ${size})`
const largerThan = (size: string): string => `(min-width: ${size})`

const ClubListPage = styled.div`
  margin-top: 65px;
  margin-bottom: 24px;
`

const ClubListGrid = styled.div`
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

const ClubListHeaderContainer = styled.div`
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

const ClubListTitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 64px;
`

const ClubListTitle = styled(PageTitle)`
  margin: 0;
  white-space: nowrap;
`

const RightSpaceWrapper = styled.div`
  padding-right: 16px;
  margin-right: auto;
`

interface ClubListHeaderProps {
  onSearch: (search: string) => any
}

interface ClubListTagsProps {
  tags: Array<Tag>
}

const ClubListTags = ({ tags }: ClubListTagsProps) => {
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

const ClubListHeader = ({ onSearch }: ClubListHeaderProps) => {
  return (
    <ClubListHeaderContainer>
      <ClubListTitleRow>
        <ClubListTitle>Explore Clubs</ClubListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ClubListTitleRow>
      <ClubListTags tags={Array.from(TAGS.values())}></ClubListTags>
    </ClubListHeaderContainer>
  )
}

interface ClubListProps {
  clubs: Map<Id, Club>
}

export const ClubList = ({ clubs }: ClubListProps) => {
  const allClubs: Array<Club> = useMemo(() => Array.from(clubs.values()), [clubs])

  const [filteredClubs, setSearchValue] = useSearch(allClubs, ['name'])

  return (
    <ClubListPage>
      <ClubListGrid>
        <ClubListHeader onSearch={setSearchValue} />
        {filteredClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </ClubListGrid>
    </ClubListPage>
  )
}
