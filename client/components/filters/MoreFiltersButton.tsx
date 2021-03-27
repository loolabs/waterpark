import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { colours } from '../../styles'
import { FilterChipText } from './FilterChip'

interface ContainerStyleProps {
  isSelected: boolean
}

const MoreFiltersButtonContainer = styled.div<ContainerStyleProps>`
  height: 38px;
  float: left;
  clear: left;
  margin-right: 12px;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props: ContainerStyleProps) =>
    props.isSelected &&
    css`
      background: ${colours.neutralLight1};
    `};
  border: 1.2px dashed ${colours.neutralDark3};
  border-radius: 50px;
  &:hover {
    cursor: pointer;
    background: ${colours.neutralLight1};
  }
`
interface MoreFiltersButtonProps {
  isModalOpen: boolean
  handleModalOpen: () => void
}

export const MoreFiltersButton = ({ isModalOpen, handleModalOpen }: MoreFiltersButtonProps) => {
  return (
    <MoreFiltersButtonContainer onClick={handleModalOpen} isSelected={isModalOpen}>
      <FilterChipText>+ More</FilterChipText>
    </MoreFiltersButtonContainer>
  )
}
