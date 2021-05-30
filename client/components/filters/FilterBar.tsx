import React from 'react'
import styled, { css } from 'styled-components'
import { RightSpaceWrapper } from '../clubs/ClubCard'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../styles'
import { Tag } from '../../context'

const TAG_HEIGHT = '38px'
const TAG_HORIZONTAL_PADDING = '16px'

export const tagColours = {
  Community: '#F1F1F1',
  Tech: '#BCFEF2',
  Creative: '#FCB8C6',
  Active: '#F9B5B5',
  Gaming: '#F3FDB6',
  Career: '#B8FDC7',
  Volunteer: '#FEE2B8',
  Science: '#B6D5FC',
  Environment: '#D1E77E',
  Health: '#97DFEF',
  Arts: '#FDD5A8',
  Math: '#FDC1EE',
  Engineering: '#D0B4EC',
}

export const TagRow = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`

export const TagGroup = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  height: ${TAG_HEIGHT};
  overflow: hidden;
`

const FilterBarContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 65px;
  flex-direction: row;
`

export const FilterChipText = styled.p`
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
  @media ${device.laptop} {
    font-size: ${mobileFontSize.subtitle2};
  }
`

export const TagBubble = styled.a<{
  colour?: string
  borderStyle?: string
  borderWidth?: string
  highlightOnHover?: boolean
  isSelected?: boolean
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
  line-height: ${TAG_HEIGHT};
  margin-bottom: 1px; // make space between rows of bubbles
  overflow: hidden;
  padding: 0 ${TAG_HORIZONTAL_PADDING};
  text-align: center;
  white-space: nowrap;
  background: ${colours.white};
  ${({ isSelected, colour }) =>
    isSelected &&
    css`
      background: ${colour};
    `};

  :hover {
    ${({ colour, highlightOnHover }) => highlightOnHover && `background-color: ${colour};`}
    cursor: pointer;
  }
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
    <TagRow>
      <FilterBarContainer>
        <TagGroup>
          {filterTags.map((tag: Tag) => {
            return (
              tag.isFeatured && (
                <RightSpaceWrapper key={tag.id}>
                  <TagBubble
                    colour={tagColours[tag.name]}
                    highlightOnHover
                    onClick={() => handleFilterChipClick(tag.id)}
                    isSelected={tag.isActive}
                  >
                    <FilterChipText>{tag.name}</FilterChipText>
                  </TagBubble>
                </RightSpaceWrapper>
              )
            )
          })}
        </TagGroup>
        <TagBubble borderStyle="dashed" borderWidth="2px" onClick={handleModalOpen}>
          + More
        </TagBubble>
      </FilterBarContainer>
    </TagRow>
  )
}
