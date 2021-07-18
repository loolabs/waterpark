import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Resource } from '../../utils'
import { Gallery } from './Gallery'
import { Reviews } from './Reviews'
import { PageTitle, fontWeight } from '../../styles'

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
