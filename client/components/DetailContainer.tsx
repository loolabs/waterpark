import styled from 'styled-components'
import { largerThan, width } from '../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 100px;

  width: 85%;

  @media ${largerThan(width.mobile)} {
    width: 65%;
  }
`
