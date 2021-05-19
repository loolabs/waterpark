import styled from 'styled-components'
import { largerThan, tablet } from '../styles'

interface BannerProps {
  backgroundImageUrl: string
}

export const Banner = styled.div<BannerProps>`
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl || ''});
  background-position: center;
  height: 20vh;

  @media ${largerThan(tablet)} {
    height: 30vh;
  }
`
