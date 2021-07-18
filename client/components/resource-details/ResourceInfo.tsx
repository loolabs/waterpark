import { useRouter } from 'next/router'
import styled from 'styled-components'
import { colours, fontWeight, PageTitle, largerThan, smallerThan, width } from '../../styles'
import { Resource } from '../../utils'
import { Review } from '../../utils/types'
import ReactStars from 'react-stars'
import { Gallery } from './Gallery'
import { formatRelative } from 'date-fns'

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

const Description = styled.p`
  line-height: 1.3;
`

interface ResourceInfoProps {
  resource: Resource
}

export const ResourceInfo = ({ resource }: ResourceInfoProps) => {
  const router = useRouter()
  const { name, description, links, galleryImages, reviews } = resource

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <div>
        <Logo src={links.iconImage} alt="" />
        <AggregateRating />
      </div>

      <Name>{name}</Name>

      <Metadata>
        <MemberCount>200-300 students</MemberCount>
      </Metadata>

      <Description>{description}</Description>
      <Gallery links={galleryImages} />
      <Reviews reviews={reviews} />
    </div>
  )
}

interface ReviewsProps {
  reviews: Array<Review>
}

const Reviews = ({ reviews }: ReviewsProps) => {
  reviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review, index) => {
        return <ReviewCard key={index} review={review} />
      })}
    </div>
  )
}

const Avatar = styled.img`
  border-radius: 50%;
  display: block;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
  height: 80px;
  width: 80px;

  @media ${largerThan(width.laptop)} {
    margin-bottom: 24px;
  }
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

const Comment = styled(({ className, review }: { className?: string; review: Review }) => {
  return (
    <div className={className}>
      <Description>{review.comment}</Description>
      <AuthorInfo>
        — {review.faculty} {review.status}, {formatRelative(review.timestamp, Date.now())}
      </AuthorInfo>
    </div>
  )
})`
  margin: 24px;
`

const ReviewCard = styled(({ review, className }: { review: Review; className?: string }) => {
  return (
    <div className={className}>
      <ReviewTopRow>
        <Avatar src={review.avatarImage}></Avatar>
        <ShowOnLaptop>
          <Comment review={review} />
        </ShowOnLaptop>
        <RatingList>
          {Object.entries(review.ratings).map(([label, score]) => {
            return <Rating score={score} key={label} label={label}></Rating>
          })}
        </RatingList>
      </ReviewTopRow>
      <HideOnLaptop>
        <Comment review={review} />
      </HideOnLaptop>
    </div>
  )
})`
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  // A subtle shadow around the card
  box-shadow: 0px 4px 3px 2px ${colours.neutralLight1};
`

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

const Rating = styled(
  ({ className, score, label }: { className?: string; score: number; label: string }) => {
    return (
      <div className={className}>
        <RatingLabel>{label.toUpperCase()}:</RatingLabel>
        <ReactStars
          count={5}
          char={'●'}
          value={score / 20}
          size={24}
          color1={'#DDDDDD'}
          color2={colours.primary1}
          edit={false}
        />
      </div>
    )
  }
)`
  @media ${smallerThan(width.laptop)} {
    display: flex;
    margin-right: 0;
    flex-wrap: wrap;
  }

  @media ${smallerThan(width.tablet)} {
    width: 120px;
  }
`
