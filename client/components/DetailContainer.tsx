import styled from 'styled-components'
import { largerThan } from '../styles'

const mobile = `425px`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 100px;

  width: 85%;

  @media ${largerThan(mobile)} {
    width: 65%;
  }
`
