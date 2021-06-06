import { useSearch } from '../hooks'
import { Club, Id } from '../../utils'
import styled from 'styled-components'
import { ClubCard } from './ClubCard'
import { PageTitle } from '../../styles'
import { SearchInput } from './SearchInput'
import { useMemo, useState } from 'react'
import { FilterBar, MoreFiltersModal } from '../filters'
import { Tag } from '../../context'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

const smallerThan = (size: string): string => `(max-width: ${size})`
const largerThan = (size: string): string => `(min-width: ${size})`

const ClubListPage = styled.div`
  margin-top: 65px;
  margin-bottom: 24px;
`

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
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

interface ClubListHeaderProps {
  onSearch: (search: string) => any
  isModalOpen: boolean
  handleModalOpen: () => void
  handleFilterChipClick: (id: number) => void
  filterTags: Tag[]
}

const ClubListHeader = ({
  onSearch,
  isModalOpen,
  handleModalOpen,
  filterTags,
  handleFilterChipClick,
}: ClubListHeaderProps) => {
  return (
    <ClubListHeaderContainer>
      <ClubListTitleRow>
        <ClubListTitle>Explore Clubs</ClubListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ClubListTitleRow>
      <FilterBar
        isModalOpen={isModalOpen}
        handleModalOpen={handleModalOpen}
        filterTags={filterTags}
        handleFilterChipClick={handleFilterChipClick}
      />
    </ClubListHeaderContainer>
  )
}

interface ClubListProps {
  clubs: Map<Id, Club>
}

export const ClubList = ({ clubs }: ClubListProps) => {
  const allClubs: Array<Club> = useMemo(() => Array.from(clubs.values()), [clubs])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [filteredClubs, filterTags, setSearchValue, setFilterTags] = useSearch(allClubs, ['name'])

  const allTags = useMemo(
    () =>
      Array.from(filterTags.keys()).map((id) => ({
        id: id,
        ...filterTags.get(id),
      })),
    [filterTags]
  )

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFilterChipClick = (id: number) => {
    let newTags = filterTags
    newTags.set(id, {
      ...filterTags.get(id),
      isActive: !filterTags.get(id).isActive,
    })
    setFilterTags(new Map(newTags))
  }

  return (
    <>
      <ClubListPage>
        <ClubListGrid>
          <ClubListHeader
            onSearch={setSearchValue}
            isModalOpen={isModalOpen}
            handleModalOpen={handleModalOpen}
            handleFilterChipClick={handleFilterChipClick}
            filterTags={allTags}
          />
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </ClubListGrid>
      </ClubListPage>
      {isModalOpen && (
        <ModalContainer>
          <MoreFiltersModal
            handleModalOpen={handleModalOpen}
            filterTags={allTags}
            handleFilterChipClick={handleFilterChipClick}
          />
        </ModalContainer>
      )}
    </>
  )
}
