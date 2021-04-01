import { useSearch } from '../hooks'
import { ClubCard } from './ClubCard'
import { Id, Club } from '../../context'
import { useMemo } from 'react'
import styled from 'styled-components'

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
  borderColour?: string
  borderStyle?: string
  borderWidth?: string
}>`
  align-items: center;
  border-color: ${({ borderColour }) => borderColour || 'black'};
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
`

interface ClubListHeaderProps {
  onSearch: (search: string) => any
}

const ClubListHeader = ({ onSearch }: ClubListHeaderProps) => {
  const tags = ['Creative', 'Active', 'Gaming', 'Volunteering', 'Career', 'Tech', 'Science']
  return (
    <div>
      <h1>Club List</h1>
      <div>
        <input onChange={(e) => onSearch(e.target.value)} />
      </div>
      <TagRow>
        <TagGroup>
          {tags.map((tag) => (
            <RightSpaceWrapper>
              <Tag>{tag}</Tag>
            </RightSpaceWrapper>
          ))}
        </TagGroup>
        <Tag borderStyle="dashed" borderWidth="2px">
          + More
        </Tag>
      </TagRow>
    </div>
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
