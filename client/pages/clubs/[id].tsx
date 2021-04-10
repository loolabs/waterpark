import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../context'
import { colours, desktopFontSize, device, fontWeight, PageTitle } from '../../styles/'
import { Club } from '../../context/'
import { BasicEvent } from '../../context/Base'
import moment from 'moment'
import { useRouter } from 'next/router'

interface BannerProps {
  backgroundImageUrl: string
}

const Banner = styled.div<BannerProps>`
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl || ''});
  background-position: center;
  height: 30vh;

  @media ${device.mobileS} {
    height: 20vh;
  }
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
  cursor: pointer;
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

const SocialLink = styled.a`
  text-decoration: underline;
`

const ClubMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const MemberCount = styled.div`
  font-style: italic;
  font-weight: ${fontWeight.bold};
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-right: -4px;
`

const Category = styled.p`
  border: 1px solid black;
  border-radius: 15px;
  font-size: 16px;
  margin: 0 4px;

  padding: 4px 10px;
  @media ${device.mobileS} {
    font-size: 14px;
  }
`

const ClubDescription = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

interface ClubInfoProps {
  club: Club
}

const ClubInfo = ({ club }: ClubInfoProps) => {
  const router = useRouter()

  const { name, description, iconURL, tags } = club
  const links = [club.facebookLink, club.twitterLink, club.instagramLink, club.websiteLink]
  const linksThatExist = links.filter((l) => l !== undefined)

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

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
  margin-top: 40px;
  margin-bottom: 32px;
`

const EventCardDetails = styled.div`
  margin-top: 0;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;

  width: 100%;

  @media ${device.mobileS} {
    margin-top: 0;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
`

const EventCardTitle = styled.p`
  font-weight: ${fontWeight.bold};
  margin-bottom: 0;
`

// TODO: make box shadow cleaner
const EventCardWrapper = styled.div`
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  display: flex;
  margin-top: 10px;
`

const EventCardImg = styled.img`
  width: 180px;
  @media ${device.mobileL} {
    object-fit: cover;
    width: 80px;
  }
`

const EventCardDate = styled.p`
  margin-top: 5px;
`

const PastEventsTitle = styled.p`
  font-size: ${desktopFontSize.subtitle1};
  margin-top: 40px;
  margin-bottom: 24px;
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

const EventCard = ({ event }: { event: BasicEvent }) => {
  const date = `${event.startTime.format('dddd')}, ${event.startTime.format('LL')}`
  const time = `${event.startTime.format('LT')} - ${event.endTime.format('LT')}`

  const dateTimeString = (
    <p>
      {date}
      {device.mobileS ? <br /> : ' '}
      {time}
    </p>
  )

  return (
    <EventCardWrapper>
      <EventCardImg src={event.backgroundImageURL} alt="" />
      <EventCardDetails>
        <EventCardTitle>{event.name}</EventCardTitle>
        <EventCardDate>{dateTimeString}</EventCardDate>
        <EventCategories tags={event.tags} />
      </EventCardDetails>
    </EventCardWrapper>
  )
}

const EventCategoriesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: -4px;

  @media ${device.mobileL} {
    justify-content: flex-start;
    margin-right: 0;
    margin-left: -4px;
  }
`

const EventCategories = ({ tags }: { tags: Array<string> }) => (
  <EventCategoriesWrapper>
    {tags.map((t) => {
      return <Category>{t}</Category>
    })}
  </EventCategoriesWrapper>
)
