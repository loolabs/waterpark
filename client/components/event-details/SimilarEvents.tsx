import styled from 'styled-components'
import { Id, Event } from '../../context'
import { desktopFontSize, fontWeight } from '../../styles'

interface SimilarEventsProps {
  allEvents: Map<Id, Event>
  event: Event
}

const Title = styled.p`
  font-weight: ${fontWeight.semiBold};
  font-size: ${desktopFontSize.h2};
`

const tagsEqual = (a: Array<string>, b: Array<string>) => {
  const aSet = new Set(a)
  const bSet = new Set(b)

  return aSet.size === bSet.size && [...aSet].every((value) => bSet.has(value))
}

export const SimilarEvents = ({ allEvents, event }: SimilarEventsProps) => {
  const events = Array.from(allEvents.values())
  const similarEvents = events.filter((e) => {
    if (e.id === event.id) return false

    const sameClub = e.club === event.club
    const sameTags = tagsEqual(e.tags, event.tags)

    return sameClub || sameTags
  })

  return (
    <div>
      <Title>Similar Events</Title>
      {similarEvents.map((e) => {
        return <li>{e.name}</li>
      })}
    </div>
  )
}
