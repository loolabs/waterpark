import { TAGS, Tag, TagGroup, TagRow, TagBubble } from '../clubs/Tag' // TODO: rearrange our dependencies to avoid this
import styled from 'styled-components'
import { PageTitle } from '../../styles'
import { SearchInput } from '../SearchInput'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

const smallerThan = (size: string): string => `(max-width: ${size})`
const largerThan = (size: string): string => `(min-width: ${size})`

const EventListHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;

  // Shrink the page's "forehead" on mobile
  gap: 8px;
  margin-top: max(48px, 5vh);
  @media ${largerThan(tablet)} {
    gap: 16px;
    margin-top: 10vh;
  }
`

const EventListTitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 64px;
`

const EventListTitle = styled(PageTitle)`
  margin: 0;
  white-space: nowrap;
`

const RightSpaceWrapper = styled.div`
  padding-right: 16px;
  margin-right: auto;
`

interface EventListHeaderProps {
  onSearch: (search: string) => any
}

interface EventListTagsProps {
  tags: Array<Tag>
}

const ClubListTags = ({ tags }: EventListTagsProps) => {
  return (
    <TagRow>
      <TagGroup>
        {tags.map(({ text, colour }) => (
          <RightSpaceWrapper key={text}>
            <TagBubble colour={colour} highlightOnHover>
              {text}
            </TagBubble>
          </RightSpaceWrapper>
        ))}
      </TagGroup>
      <TagBubble borderStyle="dashed" borderWidth="2px">
        + More
      </TagBubble>
    </TagRow>
  )
}

export const EventsHeader = ({ onSearch }: EventListHeaderProps) => {
  return (
    <EventListHeaderContainer>
      <EventListTitleRow>
        <EventListTitle>Explore Events</EventListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </EventListTitleRow>
      <ClubListTags tags={Array.from(TAGS.values())}></ClubListTags>
    </EventListHeaderContainer>
  )
}
