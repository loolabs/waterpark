import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Event } from '../../context'
import { fontWeight, PageTitle } from '../../styles'
import { Category } from '../Category'

const BackArrow = styled.img`
  margin-top: 64px;
  cursor: pointer;
`

const EventName = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const EventMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const Date = styled.div`
  font-weight: ${fontWeight.bold};
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-right: -4px;
`

const EventDescription = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

interface EventInfoProps {
  event: Event
}

export const EventInfo = ({ event }: EventInfoProps) => {
  const router = useRouter()

  const { name, description, tags, startDate, endDate } = event
  const date = `${startDate.local().format('dddd')}, ${event.startDate.local().format('LL z')}`
  const time = `${startDate.format('ha z')} - ${event.endDate.format('ha z')}`

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <EventName> {name}</EventName>

      <EventMetaData>
        <Date>
          <p>
            {date}
            <br />
            {time}
          </p>
        </Date>
        <Categories tags={tags} />
        {/* TODO: color code the tags */}
      </EventMetaData>

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
