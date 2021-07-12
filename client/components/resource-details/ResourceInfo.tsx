import { useRouter } from 'next/router'
import styled from 'styled-components'
import { colours, fontWeight, PageTitle, largerThan, smallerThan, width } from '../../styles'
import { Resource } from '../../utils'
import { Review } from '../../utils/types'
import { TagBubble } from '../common/TagBubble'
import ReactStars from 'react-stars'
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
`

interface ResourceInfoProps {
  resource: Resource
}

export const ResourceInfo = ({ resource }: ResourceInfoProps) => {
  const router = useRouter()
  const { name, description, links, galleryImages, reviews } = resource
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
      <Reviews reviews={reviews} />
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
  width: 50%;
`

const Gallery = ({ links }: { links: Array<string> }) => {
  const images = links.map((link) => {
    return {
      original: link,
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    }
  })

  return (
    <GalleryWrapper>
      <h1>Gallery</h1>

      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
      />
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
      {reviews.map((review, index) => {
        return <ReviewEntry key={index} review={review} />
      })}
    </div>
  )
}

const ReviewCard = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  // A subtle shadow around the card
  box-shadow: 0px 4px 3px 2px ${colours.neutralLight1};
`

const Avatar = styled.img`
  border-radius: 50%;
  display: block;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
  height: 80px;
  width: 80px;
`

const RatingList = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin: 24px;
  margin-left: auto;
  align-self: flex-start;
  @media ${smallerThan(width.mobileS)} {
    margin-left: 24px;
  }
`

const ReviewTopRow = styled.div`
  display: flex;
  @media ${smallerThan(width.laptop)} {
    flex-wrap: wrap;
  }
`

const ShowOnLaptop = styled.div`
  @media ${smallerThan(width.laptop)} {
    display: none;
  }
`

const HideOnLaptop = styled.div`
  @media ${largerThan(width.laptop)} {
    display: none;
  }
`

const AuthorInfo = styled.div`
  font-style: italic;
`

const Comment = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
`

const ReviewEntry = ({ review }: { review: Review }) => {
  return (
    <ReviewCard>
      <ReviewTopRow>
        <Avatar src={review.avatarImage}></Avatar>
        <ShowOnLaptop>
          <Comment>
            <Description>{review.comment}</Description>
            <AuthorInfo>- A student</AuthorInfo>
          </Comment>
        </ShowOnLaptop>
        <RatingList>
          {Object.entries(review.ratings).map((rating) => {
            return <Rating rating={rating} key={rating[0]}></Rating>
          })}
        </RatingList>
      </ReviewTopRow>
      <HideOnLaptop>
        <Comment>
          <Description>{review.comment}</Description>
          <AuthorInfo>- Student</AuthorInfo>
        </Comment>
      </HideOnLaptop>
    </ReviewCard>
  )
}

const RatingLabel = styled.p`
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding-left: auto;
  flex: 1;
  flex-grow: 1;
  font-weight: 600;
  width: auto;
  color: ${colours.neutralDark2};
`

const RatingFormat = styled.div`
  @media ${smallerThan(width.laptop)} {
    display: flex;
    margin-right: 0;
    flex-wrap: wrap;
  }

  @media ${smallerThan(width.tablet)} {
    width: 120px;
  }
`

const Rating = ({ rating }: { rating: [string, number] }) => {
  return (
    <RatingFormat>
      <RatingLabel>{rating[0].toUpperCase()}:</RatingLabel>
      <ReactStars
        count={5}
        char={'●'}
        value={rating[1] / 2}
        size={24}
        color1={'#DDDDDD'}
        color2={colours.primary1}
        edit={false}
      />
    </RatingFormat>
  )
}
