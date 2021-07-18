import ImageGallery from 'react-image-gallery'
import styled from 'styled-components'
import { largerThan, width } from '../../styles'

export const Gallery = styled(
  ({ className, links }: { links: Array<string>; className?: string }) => {
    const images = links.map((link) => {
      return {
        original: link,
        thumbnail: link,
      }
    })
    return (
      <div className={className}>
        <h1>Gallery</h1>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          renderLeftNav={(onClick, disabled) => {
            return (
              <img
                className="image-gallery-icon image-gallery-left-nav"
                src="/left-chevron.png"
                onClick={onClick}
                style={{
                  opacity: '0.7',
                  width: '40px',
                }}
              />
            )
          }}
          renderRightNav={(onClick, disabled) => {
            return (
              <img
                className="image-gallery-icon image-gallery-right-nav"
                src="/right-chevron.png"
                onClick={onClick}
                style={{
                  opacity: '0.7',
                  width: '40px',
                }}
              />
            )
          }}
        />
      </div>
    )
  }
)`
  width: 100%;
  @media ${largerThan(width.laptop)} {
    width: 60%;
  }
`
