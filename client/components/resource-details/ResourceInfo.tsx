import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Resource, resourceLookup } from '../../utils'
import { Gallery } from './Gallery'
import { Reviews } from './Reviews'
import { capitalizeFirstLetter } from '../common/Utils'
import { PageTitle, fontWeight } from '../../styles'
import { colours, width, smallerThan } from '../../styles'

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

const Name = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const Metadata = styled.div`
  margin-bottom: 16px;
`

const MemberCount = styled.p`
  font-style: italic;
  font-weight: ${fontWeight.bold};
  margin-bottom: 0;
  margin-top: 0;
`

const Description = styled.p`
  line-height: 1.3;
  flex: 1;
  @media ${smallerThan(width.mobile)} {
    width: 100%;
  }
  min-width: ${width.mobileS};
  margin-left: 16px;
  margin-right: 16px;
`

const RatingDescription = styled.div`
  display: flex;
  margin: auto;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  margin-left: -16px;
  margin-right: -16px;
`

const Ratings = styled.div`
  width: 25%;
  min-width: 200px;
  @media ${smallerThan(width.mobile)} {
    width: 100%;
    min-width: 0px;
  }
  margin: 16px;
`

interface ResourceInfoProps {
  resource: Resource
}

interface AggregateRatingProps {
  criteria: string
  value: number
}

const AggregateRating = ({ criteria, value }: AggregateRatingProps) => {
  const RatingBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  const TotalBar = styled.div`
    width: 100%;
    background-color: ${colours.neutralLight1};
    border-radius: 3px;
    margin-right: 10px;
  `
  const InnerBar = styled.div`
    width: ${value}%;
    height: 30px;
    background-color: ${colours.primary2};
    border-radius: 3px;
  `
  const RatingLabel = styled.p`
    margin: 0;
    margin-bottom: 8px;
    font-weight: 700;
    margin-top: 10px;
  `

  return (
    <div>
      <RatingLabel>{capitalizeFirstLetter(criteria)}</RatingLabel>
      <RatingBar>
        <TotalBar>
          <InnerBar id="myBar"></InnerBar>
        </TotalBar>
        {value}%
      </RatingBar>
    </div>
  )
}

export const ResourceInfo = ({ resource }: ResourceInfoProps) => {
  const router = useRouter()
  const { name, description, links, galleryImages, reviews, resourceSlug } = resource

  const TotalReviews = styled.p`
    color: ${colours.primary1};
    margin-bottom: 24px;
    font-weight: 700;
  `

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <Logo src={links.iconImage} alt="" />

      <Name>{name}</Name>

      <RatingDescription>
        <Description>
          <Metadata>
            <MemberCount>200-300 students</MemberCount>
          </Metadata>
          {description}
        </Description>
        <Ratings>
          {resourceLookup[resource.resourceSlug]['criteria'].map((criteria) => {
            return <AggregateRating criteria={criteria} value={resource.averageRating[criteria]} />
          })}
          <TotalReviews>
            {resource.totalReviews} Reviews
          </TotalReviews>
        </Ratings>
      </RatingDescription>

      <Gallery links={galleryImages} />
      <Reviews reviews={reviews} name={name} resourceSlug={resourceSlug} />
    </div>
  )
}
