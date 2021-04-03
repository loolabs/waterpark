import { useSearch } from '../hooks'
import { ClubCard } from './ClubCard'
import { Id, Club } from '../../context'
import { useMemo } from 'react'
import styled from 'styled-components'
import { colours } from '../../styles'
import { Search } from '@material-ui/icons'

const ClubListPage = styled.div`
  margin-top: 65px;
`

const ClubListGrid = styled.div`
  margin: auto;
  max-width: 80%;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 450px));
  justify-content: center;
`

// Use both ways of making things full-width because CSS can't be trusted
const ClubListHeaderContainer = styled.div`
  grid-column: 1/-1;
  column-span: all;
`

const ClubListTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const ClubListTitle = styled.h1`
  margin: 0;
`

const SearchBox = styled.div`
  height: 36px;
  position: relative;
`

const SearchIcon = styled(Search)`
  margin: 6px;
  pointer-events: none;
  position: absolute;
`

const SearchInput = styled.input`
  border: none;
  border-radius: 100vw; // arbitrarily large so that sides are fully rounded
  background-color: ${colours.neutralLight1};
  height: 36px;
  padding-bottom: 6px;
  padding-left: 36px;
  padding-right: 12px;
  padding-top: 6px;

  :focus {
    outline: none;
  }
`

const TAG_HEIGHT = '38px'
const TAG_HORIZONTAL_PADDING = '16px'

const TagRow = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`

const TagGroup = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  height: ${TAG_HEIGHT};
  overflow: hidden;
`

const RightSpaceWrapper = styled.div`
  padding-right: 16px;
  margin-right: auto;
`

const Tag = styled.a<{
  colour?: string
  borderStyle?: string
  borderWidth?: string
}>`
  align-items: center;
  border-color: ${({ colour }) => colour || 'black'};
  border-radius: 100vw; // arbitrarily large so that sides are fully rounded
  border-style: ${({ borderStyle }) => borderStyle || 'solid'};
  border-width: ${({ borderWidth }) => borderWidth || 'auto'};
  box-sizing: border-box;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${TAG_HEIGHT};
  justify-content: center;
  overflow: hidden;
  padding: 0 ${TAG_HORIZONTAL_PADDING};
  text-align: center;
  white-space: nowrap;

  :hover {
    background-color: ${({ colour }) => colour};
  }
`

interface ClubListHeaderProps {
  onSearch: (search: string) => any
}

type Tag = {
  text: string
  colour: string
}

const ClubListHeader = ({ onSearch }: ClubListHeaderProps) => {
  const tags = [
    {
      text: 'Community',
      colour: '#FCF4B1',
    },
    {
      text: 'Tech',
      colour: '#BCFEF2',
    },
    {
      text: 'Creative',
      colour: '#FCB8C6',
    },
    {
      text: 'Active',
      colour: '#F9B5B5',
    },
    {
      text: 'Volunteering',
      colour: '#FEE2B8',
    },
    {
      text: 'Gaming',
      colour: '#E1EF69',
    },
    {
      text: 'Career',
      colour: '#B8FDC7',
    },
    {
      text: 'Engineering',
      colour: '#D0B4EC',
    },
    {
      text: 'Science',
      colour: '#B6D5FC',
    },
    {
      text: 'Environment',
      colour: '#D1E77E',
    },
    {
      text: 'Arts',
      colour: '#FDD5A8',
    },
    {
      text: 'Math',
      colour: '#FDC1EE',
    },
    {
      text: 'Health',
      colour: '#97DFEF',
    },
  ]
  return (
    <ClubListPage>
      <ClubListTitleRow>
        <ClubListTitle>Explore Clubs</ClubListTitle>
        <SearchBox>
          <SearchIcon htmlColor={colours.neutralDark1} />
          <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
        </SearchBox>
      </ClubListTitleRow>
      <TagRow>
        <TagGroup>
          {tags.map((tag) => (
            <RightSpaceWrapper key={tag.text}>
              <Tag colour={tag.colour}>{tag.text}</Tag>
            </RightSpaceWrapper>
          ))}
        </TagGroup>
        <Tag borderStyle="dashed" borderWidth="2px">
          + More
        </Tag>
      </TagRow>
    </ClubListPage>
  )
}

interface ClubListProps {
  clubs: Map<Id, Club>
}

export const ClubList = ({ clubs }: ClubListProps) => {
  const allClubs: Array<Club> = useMemo(() => Array.from(clubs.values()), [clubs])

  const [filteredClubs, setSearchValue] = useSearch(allClubs, ['name'])

  return (
    <ClubListGrid>
      <ClubListHeaderContainer>
        <ClubListHeader onSearch={setSearchValue} />
      </ClubListHeaderContainer>
      {filteredClubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </ClubListGrid>
  )
}
