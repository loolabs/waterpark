import { useRouter } from 'next/router'
import styled from 'styled-components'
import { colours, fontWeight, PageTitle } from '../../styles'
import { Resource } from '../../utils'
import { Review } from '../../utils/types'
import { TagBubble } from '../common/TagBubble'

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

  const { name, description, links, reviews } = resource
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
      <Gallery></Gallery>
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

const Gallery = () => {
  return (
    <div>
      <h1>Gallery</h1>
    </div>
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

const Avatar = styled.img`
  border-radius: 4px;
  display: block;
  margin-top: 40px;
  height: 100px;
  width: 100px;
`

const ReviewCard = styled.div`
  margin: 10px;
`

const ReviewEntry = ({ review }: { review: Review }) => {
  return (
    <ReviewCard>
      <Avatar src={review.avatarImage}></Avatar>
      <Description>{review.comment}</Description>
      {Object.entries(review.ratings).map((rating) => {
        return <Rating rating={rating} key={rating[0]}></Rating>
      })}
    </ReviewCard>
  )
}

const Rating = ({rating} : {rating: [string, number]}) => {
  return (
    <>
      <p>{rating[0]}: {rating[1]}</p>
    </>
  )
}
