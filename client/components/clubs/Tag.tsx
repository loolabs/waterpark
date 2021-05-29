import styled from 'styled-components'

export type Tag = {
  text: string
  colour: string
}

const TAG_HEIGHT = '38px'

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
