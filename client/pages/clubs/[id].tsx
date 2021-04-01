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

interface BannerProps {
  backgroundImageUrl: string
}

const Banner = styled.div`
  background-image: url(${(props: BannerProps) => props.backgroundImageUrl || ''});
  background-size: cover;
  height: 400px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 100px;
  width: 65%;
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

const IconContainer = styled.div`
  margin-top: 30px;
`

const Logo = styled.img`
  border-radius: 100%;
  display: block;
  margin-top: 20px;
  width: 100px;
`

const ClubName = styled(PageTitle)`
  margin-top: 30px;
`

const Links = styled.div`
  display: flex;
  margin-top: 20px;
`

const SocialLink = styled.div`
  text-decoration: underline;
`

const ClubMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const MemberCount = styled.div`
  font-style: italic;
  font-weight: ${fontWeight.bold};
`

const Categories = styled.div`
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
  margin-top: 30px;
`

interface ClubInfoProps {
  club: Club
}

const ClubInfo = ({ club }: ClubInfoProps) => {
  const { name, description, iconURL, tags } = club

  return (
    <div>
      <IconContainer>
        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" />
      </IconContainer>

      <Logo src={iconURL} alt="" />
      <ClubName>{name}</ClubName>

      <Links>
        <SocialLink>techplusuw.ca</SocialLink>
        <SocialLink style={{ marginLeft: '10px' }}>@techplusuw</SocialLink>
      </Links>

      <ClubMetaData>
        <MemberCount>20-30 members</MemberCount>

        {/* TODO: color code the tags */}
        <Categories>
          {tags.map((t) => (
            <Category>{t}</Category>
          ))}
        </Categories>
      </ClubMetaData>

      <ClubDescription>{description}</ClubDescription>
    </div>
  )
}

const EventsTitle = styled.h2``

const EventCardDetails = styled.div`
  margin: 0 20px 20px;
  width: 100%;

  @media ${device.mobileS} {
    margin: 0 10px 10px;
  }
`

const EventCardTitle = styled.p`
  font-weight: 700;
  margin-bottom: 0;
`

// TODO: make box shadow cleaner
const EventCard = styled.div`
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 100px rgba(166, 173, 201, 0.2);
  display: flex;
  margin-top: 10px;

  @media ${device.mobileL} {
    font-size: 10px;
  }
`

const EventCardImg = styled.img`
  width: 128px;
  @media ${device.mobileL} {
    width: 64px;
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
        return <p>h</p>
      })}
      <PastEventsTitle>Past Events</PastEventsTitle>
      {pastEvents.map((e) => {
        return (
          <EventCard>
            <EventCardImg src={e.backgroundImageURL} alt="" />
            <EventCardDetails>
              <EventCardTitle>{e.name}</EventCardTitle>
              <EventCardDate>
                {device.mobileS ? (
                  <p>
                    {e.startTime.format('dddd')}, {e.startTime.format('LL')}
                    <br />
                    {e.startTime.format('LT')} - {e.endTime.format('LT')} ET
                  </p>
                ) : (
                  <p>
                    {e.startTime.format('dddd')}, {e.startTime.format('LL')} |{' '}
                    {e.startTime.format('LT')} - {e.endTime.format('LT')} ET
                  </p>
                )}
              </EventCardDate>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {e.tags.map((t) => {
                  return <Category>{t}</Category>
                })}
              </div>
            </EventCardDetails>
          </EventCard>
        )
      })}
    </div>
  )
}
