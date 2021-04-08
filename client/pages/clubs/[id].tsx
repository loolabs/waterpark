import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../context'
import { desktopFontSize, device, fontWeight, PageTitle } from '../../styles/'
import { Club } from '../../context/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { BasicEvent } from '../../context/Base'
import moment from 'moment'
import { weight700 } from '../../styles/typography'

interface BannerProps {
  backgroundImageUrl: string
}

const Banner = styled.div<BannerProps>`
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl || ''});
  background-position: center;
  height: 30vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 100px;
  width: 65%;

  @media ${device.mobileL} {
    width: 85%;
  }
`

export default function ClubDetail() {
  const { clubs } = useAppContext()
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  const club = clubs.get(parseInt(id))

  return (
    <div>
      <Banner backgroundImageUrl={club.backgroundImageURL} />
      <Container>
        <ClubInfo club={club} />
        <EventsHostedByClub events={club.events} />
      </Container>
    </div>
  )
}

const BackArrow = styled.img`
  margin-top: 64px;
`

const Logo = styled.img`
  border-radius: 100%;
  display: block;
  margin-top: 40px;
  height: 100px;
  width: 100px;
`

const ClubName = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const Links = styled.div`
  display: flex;
  margin-top: 16px;
`

const SocialLink = styled.div`
  text-decoration: underline;
`

const ClubMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const MemberCount = styled.div`
  font-style: italic;
  font-weight: ${fontWeight.bold};
`

const CategoriesWrapper = styled.div`
  display: flex;
`

const Category = styled.p`
  border: 1px solid black;
  border-radius: 15px;
  font-size: 12px;
  margin-left: 5px;

  padding: 5px 10px;
  @media ${device.mobileS} {
    padding: 2px 5px;
  }
`

const ClubDescription = styled.p`
  margin-top: 24px;
`

interface ClubInfoProps {
  club: Club
}

const ClubInfo = ({ club }: ClubInfoProps) => {
  const { name, description, iconURL, tags } = club
  const links = [club.facebookLink, club.twitterLink, club.instagramLink, club.websiteLink]
  const linksThatExist = links.filter((l) => l !== undefined)

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" />

      <Logo src={iconURL} alt="" />
      <ClubName> {name}</ClubName>

      <Links>
        {linksThatExist.map((l) => (
          <SocialLink>{l}</SocialLink>
        ))}
      </Links>

      <ClubMetaData>
        <MemberCount>20-30 members</MemberCount>
        <Categories tags={tags} />
        {/* TODO: color code the tags */}
      </ClubMetaData>

      <ClubDescription>{description}</ClubDescription>
    </div>
  )
}

const Categories = ({ tags }: { tags: Array<string> }) => (
  <CategoriesWrapper>
    {tags.map((t) => (
      <Category>{t}</Category>
    ))}
  </CategoriesWrapper>
)

const EventsTitle = styled.h2`
  margin-top: 32px;
`

const EventCardDetails = styled.div`
  margin: 0 20px 20px;
  width: 100%;

  @media ${device.mobileS} {
    margin: 0 10px 10px;
  }
`

const EventCardTitle = styled.p`
  font-weight: ${weight700};
  margin-bottom: 0;
`

// TODO: make box shadow cleaner
const EventCardWrapper = styled.div`
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 100px rgba(166, 173, 201, 0.2);
  display: flex;
  margin-top: 10px;
`

const EventCardImg = styled.img`
  width: 256px;
  @media ${device.mobileL} {
    width: 128px;
  }
`

const EventCardDate = styled.p`
  margin-top: 5px;
`

const PastEventsTitle = styled.p`
  font-size: ${desktopFontSize.subtitle1};
`

const EventsHostedByClub = ({ events }: { events: Array<BasicEvent> }) => {
  const upcomingEvents = events.filter((e) => e.startTime.isAfter(moment()))

  const pastEvents = events.filter((e) => e.startTime.isBefore(moment()))

  return (
    <div>
      <EventsTitle>Upcoming Events</EventsTitle>
      {upcomingEvents.map((e) => {
        return <EventCard event={e} />
      })}
      <PastEventsTitle>Past Events</PastEventsTitle>
      {pastEvents.map((e) => {
        return <EventCard event={e} />
      })}
    </div>
  )
}

const EventCard = ({ event }: { event: BasicEvent }) => (
  <EventCardWrapper>
    <EventCardImg src={event.backgroundImageURL} alt="" />
    <EventCardDetails>
      <EventCardTitle>{event.name}</EventCardTitle>
      <EventCardDate>
        {device.mobileS ? (
          <p>
            {event.startTime.format('dddd')}, {event.startTime.format('LL')}
            <br />
            {event.startTime.format('LT')} - {event.endTime.format('LT')} ET
          </p>
        ) : (
          <p>
            {event.startTime.format('dddd')}, {event.startTime.format('LL')} |{' '}
            {event.startTime.format('LT')} - {event.endTime.format('LT')} ET
          </p>
        )}
      </EventCardDate>
      <EventCategories tags={event.tags} />
    </EventCardDetails>
  </EventCardWrapper>
)

const EventCategoriesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media ${device.mobileL} {
    justify-content: flex-start;
  }
`

const EventCategories = ({ tags }: { tags: Array<string> }) => (
  <EventCategoriesWrapper>
    {tags.map((t) => {
      return <Category>{t}</Category>
    })}
  </EventCategoriesWrapper>
)
