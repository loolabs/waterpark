import styled from 'styled-components'

export type Tag = {
  text: string
  colour: string
}

const TAG_HEIGHT = '38px'
const TAG_HORIZONTAL_PADDING = '16px'

export const TagRow = styled.div`
  justify-content: flex-start;
  display: flex;
  width: 100%;
`

export const TagGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  flex-wrap: wrap;
  height: ${TAG_HEIGHT};
  overflow: hidden;
`

export const TagBubble = styled.a<{
  colour?: string
  borderStyle?: string
  borderWidth?: string
  highlightOnHover?: boolean
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
  :hover {
    ${({ colour, highlightOnHover }) => highlightOnHover && `background-color: ${colour};`}
  }
`