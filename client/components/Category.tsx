import styled from 'styled-components'
import { desktopFontSize, mobileFontSize } from '../styles'

const mobile = `425px`
const largerThan = (size: string): string => `(min-width: ${size})`

export const Category = styled.p`
  border: 1px solid black;
  border-radius: 15px;
  margin: 0 4px;

  padding: 4px 10px;
  font-size: ${mobileFontSize.body1};

  @media ${largerThan(mobile)} {
    font-size: ${desktopFontSize.body1};
  }
`
