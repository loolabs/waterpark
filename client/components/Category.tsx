import styled from 'styled-components'
import { desktopFontSize, largerThan, mobile, mobileFontSize } from '../styles'

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
