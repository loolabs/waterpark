import styled from 'styled-components'

const tablet = `768px`
const largerThan = (size: string): string => `(min-width: ${size})`

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
