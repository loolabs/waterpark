import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../styles'
import { PageTitle } from '../../styles/typography'
import { tagColours, TagBubble } from '../filters/FilterBar'

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0px;
  left 0px;
  position: absolute;
  z-index: 10;
  background-color: ${colours.black};
  opacity: 0.5;
`

const Divider = styled.div`
  height: 2px;
  width: 100%;
  margin-top: 36px;
  background-color: ${colours.black};
`

const Modal = styled.div`
  width: 70vw;
  position: absolute;
  z-index: 15;
  opacity: 1;
  background-color: ${colours.white};
  border-radius: 5px;
  padding: 32px 60px 60px 60px;
`

const SubTitle = styled.p`
  font-style: normal;
  font-weight: ${fontWeight.bold};
  font-size: ${desktopFontSize.subtitle1};
  line-height: 120%;
  color: ${colours.black};
  margin-top: 56px;
  @media ${device.laptop} {
    font-size: ${mobileFontSize.subtitle1};
  }
`

const FilterTagsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 14px;
`

const ActionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
`

const ActionButton = styled.a`
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: ${desktopFontSize.subtitle1};
  line-height: 120%;
  color: ${colours.black};
  margin-left: 56px;

  &:hover {
    cursor: pointer;
  }

  @media ${device.laptop} {
    font-size: ${mobileFontSize.subtitle1};
  }
`
export interface Tag {
  id: number
  name: string
  isActive: boolean
  category: string
  isFeatured: boolean
}

interface MoreFiltersModalProps {
  handleModalOpen: () => void
  handleFilterChipClick: (id: number) => void
  filterTags: Tag[]
}

export const MoreFiltersModal = ({
  handleModalOpen,
  filterTags,
  handleFilterChipClick,
}: MoreFiltersModalProps) => {
  return (
    <>
      <Background onClick={handleModalOpen} />
      <Modal>
        <PageTitle>Explore Club Categories</PageTitle>
        <Divider />
        <SubTitle>General Categories</SubTitle>
        <FilterTagsContainer>
          {filterTags.map((tag) => {
            return (
              tag.category === 'General' && (
                <TagBubble
                  colour={tagColours[tag.name]}
                  highlightOnHover
                  onClick={() => handleFilterChipClick(tag.id)}
                  isSelected={tag.isActive}
                >
                  {tag.name}
                </TagBubble>
              )
            )
          })}
        </FilterTagsContainer>

        <SubTitle>Faculty Categories</SubTitle>
        <FilterTagsContainer>
          {' '}
          {filterTags.map((tag) => {
            return (
              tag.category === 'Faculty' && (
                <TagBubble
                  colour={tagColours[tag.name]}
                  highlightOnHover
                  onClick={() => handleFilterChipClick(tag.id)}
                  isSelected={tag.isActive}
                >
                  {tag.name}
                </TagBubble>
              )
            )
          })}
        </FilterTagsContainer>

        <ActionButtonsContainer>
          <ActionButton>Apply</ActionButton>
          <ActionButton onClick={handleModalOpen}>Cancel</ActionButton>
        </ActionButtonsContainer>
      </Modal>
    </>
  )
}
