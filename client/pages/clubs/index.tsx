import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useAppContext, Club } from '../../context'
import { ClubList } from '../../components/clubs'
import { useSearch } from './../../components/hooks'
import { FilterBar, MoreFiltersModal } from '../../components/filters'

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

export default function Clubs() {
  const { clubs } = useAppContext()

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
    <PageContainer>
      <FilterBar
        isModalOpen={isModalOpen}
        handleModalOpen={handleModalOpen}
        filterTags={allTags}
        handleFilterChipClick={handleFilterChipClick}
      />
      <ClubList clubs={clubs} filteredClubs={filteredClubs} setSearchValue={setSearchValue} />
      {isModalOpen && (
        <ModalContainer>
          <MoreFiltersModal
            handleModalOpen={handleModalOpen}
            filterTags={allTags}
            handleFilterChipClick={handleFilterChipClick}
          />
        </ModalContainer>
      )}
    </PageContainer>
  )
}
