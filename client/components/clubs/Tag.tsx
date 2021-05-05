import styled from 'styled-components'

export type Tag = {
  text: string
  colour: string
}

export const TAGS = new Map<string, Tag>([
  [
    'Community',
    {
      text: 'Community',
      colour: '#FCF4B1',
    },
  ],
  [
    'Tech',
    {
      text: 'Tech',
      colour: '#BCFEF2',
    },
  ],
  [
    'Creative',
    {
      text: 'Creative',
      colour: '#FCB8C6',
    },
  ],
  [
    'Active',
    {
      text: 'Active',
      colour: '#F9B5B5',
    },
  ],
  [
    'Volunteering',
    {
      text: 'Volunteering',
      colour: '#FEE2B8',
    },
  ],
  [
    'Gaming',
    {
      text: 'Gaming',
      colour: '#E1EF69',
    },
  ],
  [
    'Career',
    {
      text: 'Career',
      colour: '#B8FDC7',
    },
  ],
  [
    'Engineering',
    {
      text: 'Engineering',
      colour: '#D0B4EC',
    },
  ],
  [
    'Science',
    {
      text: 'Science',
      colour: '#B6D5FC',
    },
  ],
  [
    'Environment',
    {
      text: 'Environment',
      colour: '#D1E77E',
    },
  ],
  [
    'Arts',
    {
      text: 'Arts',
      colour: '#FDD5A8',
    },
  ],
  [
    'Math',
    {
      text: 'Math',
      colour: '#FDC1EE',
    },
  ],
  [
    'Health',
    {
      text: 'Health',
      colour: '#97DFEF',
    },
  ],
])

const TAG_HEIGHT = '38px'
const TAG_HORIZONTAL_PADDING = '16px'

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
