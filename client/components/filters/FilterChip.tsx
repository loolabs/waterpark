import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../styles'

interface ContainerStyleProps {
  chipColour: string
  isSelected: boolean
}

const tagColours = {
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

const FilterChipContainer = styled.div<ContainerStyleProps>`
  height: 38px;
  float: left;
  clear: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props: ContainerStyleProps) =>
    css`
      border: 3px solid ${props.chipColour};
      &:hover {
        cursor: pointer;
        background: ${props.chipColour};
      }
    `};
  margin-right: 12px;
  padding: 0px 16px;
  border-radius: 50px;
  background: ${colours.white};
  ${(props: ContainerStyleProps) =>
    props.isSelected &&
    css`
      background: ${props.chipColour};
    `};
`

export const FilterChipText = styled.p`
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: ${desktopFontSize.subtitle2};
  line-height: 120%;
  color: ${colours.neutralDark3};
  @media ${device.laptop} {
    font-size: ${mobileFontSize.subtitle2};
  }
`

interface FilterChipProps {
  filterChipId: number
  filterChipText: string
  isSelected: boolean
  handleClick: (id: number) => void
}

export const FilterChip = ({
  filterChipId,
  filterChipText,
  isSelected,
  handleClick,
}: FilterChipProps) => {
  return (
    <FilterChipContainer
      onClick={() => handleClick(filterChipId)}
      chipColour={tagColours[filterChipText]}
      isSelected={isSelected}
    >
      <FilterChipText>{filterChipText}</FilterChipText>
    </FilterChipContainer>
  )
}
