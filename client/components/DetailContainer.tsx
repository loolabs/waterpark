import styled from 'styled-components'

const mobile = `425px`
const largerThan = (size: string): string => `(min-width: ${size})`

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
