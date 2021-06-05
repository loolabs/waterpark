import { Tag, TagGroup, TagRow } from '../clubs/Tag' // TODO: rearrange our dependencies to avoid this
import { TagBubble } from '../common/TagBubble'
import styled from 'styled-components'
import { colours, PageTitle } from '../../styles'
import { SearchInput } from '../SearchInput'

const mobile = `425px`
const tablet = `768px`
const laptop = `1024px`

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

const ClubListTags = () => {
  return (
    <TagRow>
      <TagGroup>
        {Object.keys(colours.tagColours).map((text, index) => (
          <RightSpaceWrapper key={text}>
            <TagBubble
              colour={colours.tagColours[text]}
              highlightOnHover
              key={`club-card-tag-${index}-${text}`}
            >
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
      <ClubListTags />
    </EventListHeaderContainer>
  )
}
