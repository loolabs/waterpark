import { useRouter } from 'next/router'
import styled from 'styled-components'
import { colours, fontWeight, PageTitle } from '../../styles'
import { Resource } from '../../utils'
import { Review } from '../../utils/types'
import { TagBubble } from '../common/TagBubble'
import ImageGallery from 'react-image-gallery'

const BackArrow = styled.img`
  margin-top: 64px;
  cursor: pointer;
`

const Logo = styled.img`
  border-radius: 4px;
  display: block;
  margin-top: 40px;
  height: 100px;
  width: 100px;
`

const AggregateRating = styled.div``

const Name = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const Links = styled.div`
  display: flex;
  margin-top: 16px;
`

const SocialLink = styled.a`
  margin-right: 32px;
  text-decoration: underline;
`

const Metadata = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const MemberCount = styled.p`
  font-style: italic;
  font-weight: ${fontWeight.bold};
  margin-bottom: 0;
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-right: -4px;
`

const Description = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

interface ResourceInfoProps {
  resource: Resource
}

export const ResourceInfo = ({ resource }: ResourceInfoProps) => {
  const router = useRouter()

  const { name, description, links, galleryImages } = resource
  // const potentialLinks = [links.facebook, links.twitter, links.instagram, links.website]
  // const linksThatExist = potentialLinks.filter((link) => link !== undefined)

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <div>
        <Logo src={links.iconImage} alt="" />
        <AggregateRating />
      </div>

      <Name>{name}</Name>

      {/* <Links>
        {linksThatExist.map((l, i) => (
          <SocialLink key={`social-link-${i}`}>{l}</SocialLink>
        ))}
      </Links> */}

      <Metadata>
        <MemberCount>200-300 students</MemberCount>
        {/* <Categories tags={tags} /> */}
      </Metadata>

      <Description>{description}</Description>
      <Gallery links={galleryImages} />
      <Reviews reviews={[]} />
    </div>
  )
}

const Categories = ({ tags }: { tags: Array<string> }) => (
  <CategoriesWrapper>
    {tags.map((t, i) => (
      <TagBubble key={`category-tag-${i}`} colour={colours.tagColours[t]}>
        {t}
      </TagBubble>
    ))}
  </CategoriesWrapper>
)

const GalleryWrapper = styled.div`
  width: 60%;
`

const Gallery = ({ links }: { links: Array<string> }) => {
  const images = links.map((link) => {
    return {
      original: link,
      thumbnail: link,
    }
  })

  return (
    <GalleryWrapper>
      <h1>Gallery</h1>

      <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
    </GalleryWrapper>
  )
}

interface ReviewsProps {
  reviews: Array<Review>
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => {
        return <ReviewEntry review={review} />
      })}
    </div>
  )
}

const Avatar = styled.img`
  border-radius: 4px;
  display: block;
  margin-top: 40px;
  height: 100px;
  width: 100px;
`

const Rating = styled.p``

const ReviewEntry = ({ review }: { review: Review }) => {
  return (
    <>
      <Avatar />
      <Description />
      <Rating />
    </>
  )
}
