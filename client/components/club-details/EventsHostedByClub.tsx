import styled from 'styled-components'
import moment from 'moment-timezone'
import { Category } from '../Category'
import { colours, desktopFontSize, device, fontWeight, largerThan, mobile } from '../../styles'
import { BasicEvent } from '../../utils'

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
`

const EventCardTitle = styled.p`
  font-weight: ${fontWeight.bold};
  margin-bottom: 0;
`

const EventCardWrapper = styled.div`
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  display: flex;
  margin-top: 10px;
`

const EventCardImg = styled.img`
  width: 80px;

  @media ${largerThan(mobile)} {
    width: 180px;
  }
`

const EventCardDate = styled.div`
  margin-top: 5px;
`

const PastEventsTitle = styled.p`
  font-size: ${desktopFontSize.subtitle1};
  margin-top: 40px;
  margin-bottom: 24px;
`

export const EventsHostedByClub = ({ events }: { events: Array<BasicEvent> }) => {
  const upcomingEvents = events.filter((e) => e.startTime.isAfter(moment()))

  const pastEvents = events.filter((e) => e.startTime.isBefore(moment()))

  return (
    <div>
      <EventsTitle>Upcoming Events</EventsTitle>
      {upcomingEvents.map((e, i) => {
        return <EventCard event={e} key={`event-card-${i}`} />
      })}
      <PastEventsTitle>Past Events</PastEventsTitle>
      {pastEvents.map((e, i) => {
        return <EventCard event={e} key={`past-event-card-${i}`} />
      })}
    </div>
  )
}

export const EventCard = ({ event }: { event: BasicEvent }) => {
  const date = `${event.startTime.local().format('dddd')}, ${event.startTime
    .local()
    .format('LL z')}`
  // format: 8:55 PM - 9:55 PM EST
  const time = `${event.startTime.format('ha z')} - ${event.endTime.format('ha z')}`

  const dateTimeString = (
    <p>
      {date}
      {device.mobileS ? <br /> : ' '}
      {time}
    </p>
  )

  return (
    <EventCardWrapper>
      <EventCardImg src={event.bannerImageURL} alt="" />
      <EventCardDetails>
        <EventCardTitle>{event.name}</EventCardTitle>
        <EventCardDate>{dateTimeString}</EventCardDate>
        <EventCategories tags={event.tags} />
      </EventCardDetails>
    </EventCardWrapper>
  )
}

const EventCategoriesWrapper = styled.div`
  justify-content: flex-start;
  margin-right: 0;
  margin-left: -4px;

  @media ${largerThan(mobile)} {
    display: flex;
    justify-content: flex-end;
    margin-right: -4px;
  }
`

const EventCategories = ({ tags }: { tags: Array<string> }) => (
  <EventCategoriesWrapper>
    {tags.map((t, i) => {
      return <Category key={`tag-${i}`}>{t}</Category>
    })}
  </EventCategoriesWrapper>
)
