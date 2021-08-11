import styled from 'styled-components'
import { colours, largerThan, smallerThan, width } from '../../styles'
import { Review } from '../../utils/types'
import ReactStars from 'react-stars'
import { formatRelative } from 'date-fns'
import { SubmitReview } from './SubmitReview'

export const Reviews = ({
  reviews,
  name,
  resourceSlug,
}: {
  reviews: Array<Review>
  name: string
  resourceSlug: string
}) => {
  reviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return (
    <div>
      <h1>Reviews</h1>
      <SubmitReview name={name} resourceSlug={resourceSlug} />
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

const Description = styled.p`
  line-height: 1.3;
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
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  // A subtle shadow around the card
  box-shadow: 0px 4px 3px 2px ${colours.neutralLight1};
`

const RatingLabel = styled.p`
  margin-bottom: 4px;
  margin-top: 4px;
  margin-right: 8px;
  padding-left: auto;
  flex: 1;
  flex-grow: 1;
  font-weight: 600;
  width: auto;
  color: ${colours.neutralDark2};
`

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const Rating = styled(
  ({ className, score, label }: { className?: string; score: number; label: string }) => {
    return (
      <div className={className}>
        <RatingLabel>{capitalizeFirstLetter(label)}</RatingLabel>
        <ReactStars
          count={5}
          // Circles are too small on Windows font
          char={navigator.appVersion.indexOf('Win') != -1 ? '⬤' : '●'} 
          value={score / 20}
          size={24}
          color1={'#DDDDDD'}
          color2={colours.primary2}
          edit={false}
        />
      </div>
    )
  }
)`
  min-width: 120px;

  @media ${smallerThan(width.laptop)} {
    display: flex;
    margin-right: 0;
    flex-wrap: wrap;
  }

  @media ${smallerThan(width.tablet)} {
    max-width: 130px;
  }
`
