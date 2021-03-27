import React, { useState } from 'react'
import styled from 'styled-components'
import { FilterChip, MoreFiltersButton, MoreFiltersModal } from './'
import { colours, device } from '../../styles'
import { Tag, TAGS } from '../../context'

const FilterBarContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 65px;
  flex-direction: row;
`

interface FilterBarProps {
  isModalOpen: boolean
  handleModalOpen: () => void
  handleFilterChipClick: (id: number) => void
  filterTags: Tag[]
}

export const FilterBar = ({
  isModalOpen,
  handleModalOpen,
  filterTags,
  handleFilterChipClick,
}: FilterBarProps) => {
  return (
    <>
      <FilterBarContainer>
        {filterTags.map((tag: Tag) => {
          return (
            tag.isFeatured && (
              <FilterChip
                filterChipId={tag.id}
                filterChipText={tag.name}
                isSelected={tag.isActive}
                handleClick={handleFilterChipClick}
              />
            )
          )
        })}
        <MoreFiltersButton isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} />
      </FilterBarContainer>
    </>
  )
}
