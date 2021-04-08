import { useSearch } from '../hooks'
import { ClubCard } from './ClubCard'
import { TAGS, Tag, TagGroup, TagRow } from './Tag'
import { Id, Club } from '../../context'
import { useMemo } from 'react'
import styled from 'styled-components'
import { colours, PageTitle } from '../../styles'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

const smallerThan = (size: string): string => `(max-width: ${size})`
const largerThan = (size: string): string => `(min-width: ${size})`

const ClubListPage = styled.div`
  margin-top: 65px;
`

const ClubListGrid = styled.div`
  display: grid;
  grid-column-gap: 12px;
  grid-row-gap: 16px;
  justify-content: center;

  margin-left: 12px;
  margin-right: 12px;
  grid-template-columns: repeat(1, minmax(150px, 450px));
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
  gap: 12px;
  margin-bottom: 24px;

  margin-top: max(48px, 5vh);
  @media ${largerThan(tablet)} {
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

const SearchInput = styled.input`
  background-image: url(/search-24px.svg);
  background-repeat: no-repeat;
  border: none;
  border-radius: 100vw; // arbitrarily large so that sides are fully rounded
  margin-left: 8px;
  padding-right: 8px;

  background-color: none;
  background-position: 8px 4px;
  height: 40px;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 8px;
  width: 32px;
  @media ${largerThan(tablet)} {
    background-color: ${colours.neutralLight1};
    background-position: 12px 8px;
    height: 48px;
    margin-right: 0;
    padding-left: 48px;
    padding-right: 12px;
    width: 240px;
  }

  @media ${smallerThan(tablet)} {
    :focus {
      background-color: ${colours.neutralLight1};
      outline: none;

      width: 100%;
      transition: width 0.5s;
    }
  }
  @media ${largerThan(tablet)} {
    :focus {
      outline: none;
    }
  }
`

const RightSpaceWrapper = styled.div`
  padding-right: 16px;
  margin-right: auto;
`

interface ClubListHeaderProps {
  onSearch: (search: string) => any
}

const ClubListHeader = ({ onSearch }: ClubListHeaderProps) => {
  return (
    <ClubListHeaderContainer>
      <ClubListTitleRow>
        <ClubListTitle>Explore Clubs</ClubListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ClubListTitleRow>
      <TagRow>
        <TagGroup>
          {Array.from(TAGS).map(([_, tag]) => (
            <RightSpaceWrapper key={tag.text}>
              <Tag colour={tag.colour}>{tag.text}</Tag>
            </RightSpaceWrapper>
          ))}
        </TagGroup>
        <Tag borderStyle="dashed" borderWidth="2px">
          + More
        </Tag>
      </TagRow>
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
