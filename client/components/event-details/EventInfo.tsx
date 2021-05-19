import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Event } from '../../utils'
import {
  desktopFontSize,
  mobileFontSize,
  fontWeight,
  PageTitle,
  largerThan,
  mobile,
} from '../../styles'
import { Category } from '../Category'

const tablet = `768px`

const BackArrow = styled.img`
  margin-top: 64px;
  cursor: pointer;
`

const EventName = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const ClubDate = styled.p`
  margin-bottom: 0;
  font-size: ${mobileFontSize.body1};
  font-weight: ${fontWeight.semiBold};

  @media ${largerThan(mobile)} {
    font-size: ${desktopFontSize.h3};
  }
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-left: auto;
`

const EventDescription = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

const ClubInfo = styled.div`
  align-items: center;
  display: flex;
  margin-top: 48px;
`

const ClubIcon = styled.img`
  border-radius: 100%;
  height: 40px;
  width: 40px;
`

const ClubName = styled.p`
  font-weight: ${fontWeight.semiBold};
  margin-left: 8px;

  @media ${largerThan(mobile)} {
    margin-left: 16px;
    font-size: ${desktopFontSize.h3};
  }
`

interface EventInfoProps {
  event: Event
}

export const EventInfo = ({ event }: EventInfoProps) => {
  const router = useRouter()

  const { name, description, tags, startTime: startDate, endTime: endDate } = event
  const date = `${startDate.local().format('dddd')}, ${event.startTime.local().format('LL z')}`
  const time = `${startDate.format('ha z')} - ${endDate.format('ha z')}`

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <EventName>{name}</EventName>

      <ClubDate>
        {date}
        <br />
        {time}
      </ClubDate>
      {/* TODO: color code the tags */}

      <ClubInfo>
        <ClubIcon src={event.club.iconURL} />
        <ClubName>{event.club.name}</ClubName>
        <Categories tags={tags} />
      </ClubInfo>

      <EventDescription>{description}</EventDescription>
    </div>
  )
}

const Categories = ({ tags }: { tags: Array<string> }) => (
  <CategoriesWrapper>
    {tags.map((t, i) => (
      <Category key={`category-tag-${i}`}>{t}</Category>
    ))}
  </CategoriesWrapper>
)
