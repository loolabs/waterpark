import { useSearch } from '../hooks'
import { TagGroup, TagRow } from './Tag'
import { TagBubble } from '../common/TagBubble'
import { Resource, Id, ResourceDisplayStrings, RatingCriteria } from '../../utils'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ResourceCard } from './ResourceCard'
import { PageTitle, width, smallerThan, largerThan, colours } from '../../styles'
import { SearchInput } from '../SearchInput'
import { capitalizeFirstLetter } from '../common/Functions'

const ResourceListPage = styled.div`
  margin-top: 65px;
  margin-bottom: 24px;
`

const ResourceListGrid = styled.div`
  display: grid;
  grid-gap: 16px;
  justify-content: center;
  // Expand the number of columns with the width of the screen
  grid-template-columns: repeat(1, minmax(150px, 450px));
  margin-left: 12px;
  margin-right: 12px;
  @media ${largerThan(width.tablet)} and ${smallerThan(width.laptop)} {
    grid-template-columns: repeat(2, minmax(300px, 450px));
    margin-left: 24px;
    margin-right: 24px;
  }
  @media ${largerThan(width.laptop)} {
    margin: auto;
    max-width: 80%;
    grid-template-columns: 450px repeat(auto-fit, 450px);
  }
`

const ResourceListHeaderContainer = styled.div`
  // Use both ways of making things full-width because CSS can't be trusted
  column-span: all;
  grid-column: 1/-1;

  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  // Shrink the page's "forehead" on mobile
  gap: 8px;
  margin-top: max(48px, 5vh);
  @media ${largerThan(width.laptop)} {
    gap: 16px;
    margin-top: 10vh;
  }
`

const ResourceListTitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 64px;
`

const ResourceListTitle = styled(PageTitle)`
  margin: 0;
  white-space: nowrap;
`

const RightSpaceWrapper = styled.div`
  margin-right: auto;
`

type sortPatternType = (first: Resource, second: Resource) => number

interface ResourceListHeaderProps {
  onSearch: (search: string) => any
  changeSortPattern: (sortPatternType) => void
  slug: string
}

const ResourceListTags = ({slug, changeSortPattern} : {slug: string, changeSortPattern: (sortPatternType) => void}) => { 
  let criteria = RatingCriteria[slug];
  let sortingDefinitions = { 
    "alphabetical" : (first : Resource, second : Resource) => {
      return first.name.localeCompare(second.name); // sort from least (a) to most (z)
    },
    "number of ratings" : (first : Resource, second : Resource) => {
      return second.totalReviews - first.totalReviews; // sort from most to least
    }
  }
  
  criteria.map(item => {
    sortingDefinitions[item] = (first : Resource, second : Resource) => {
      return second.averageRating[item] - first.averageRating[item] // sort from most to least
    }
  })
  
  criteria = criteria.map(item => capitalizeFirstLetter(item))
  criteria = [ "Alphabetical", "Number of Ratings", ...criteria]

  return (
    <TagRow>
      <TagGroup>  
        {criteria.map((text, index) => (
          <TagBubble
            colour={colours.neutralLight2}
            highlightOnHover
            key={`club-card-tag-${index}-${text}`}
            onClick={() => {changeSortPattern(sortingDefinitions[text.toLowerCase()])}}
          >
            {text}
          </TagBubble>
        ))}
      </TagGroup>
    </TagRow>
  )
}

const ResourceListHeader = ({ onSearch, changeSortPattern, slug }: ResourceListHeaderProps) => {
  return (
    <ResourceListHeaderContainer>
      <ResourceListTitleRow>
        <ResourceListTitle>Explore {ResourceDisplayStrings[slug]}</ResourceListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ResourceListTitleRow>
      <ResourceListTags changeSortPattern={changeSortPattern} slug={slug} ></ResourceListTags>
    </ResourceListHeaderContainer>
  )
}

interface ResourceListProps {
  resources: Map<Id, Resource>
  slug: string
}

export const ResourceList = ({ resources, slug }: ResourceListProps) => {
  const allResources: Array<Resource> = useMemo(() => Array.from(resources.values()), [resources])

  const [filteredResources, setSearchValue] = useSearch(allResources, ['name'])

  const [sortPattern, setSortPattern] = useState(() => (first : Resource, second : Resource) => {
    return first.name.localeCompare(second.name);
  })

  const changeSortPattern = (sortPattern) => {
    setSortPattern(() => sortPattern)
  }
  filteredResources.sort(sortPattern);

  return (
    <ResourceListPage>
      <ResourceListGrid>
        <ResourceListHeader changeSortPattern={changeSortPattern} onSearch={setSearchValue} slug={slug} />
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} Resource={resource} />
        ))}
      </ResourceListGrid>
    </ResourceListPage>
  )
}
