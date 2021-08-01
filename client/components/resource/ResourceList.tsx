import { useSearch } from '../hooks'
import { Resource, Id, ResourceDisplayStrings } from '../../utils'
import { useMemo } from 'react'
import styled from 'styled-components'
import { ResourceCard } from './ResourceCard'
import { PageTitle, width, smallerThan, largerThan } from '../../styles'
import { SearchInput } from '../SearchInput'

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

interface ResourceListHeaderProps {
  onSearch: (search: string) => any
  slug: string
}

const ResourceListHeader = ({ onSearch, slug }: ResourceListHeaderProps) => {
  return (
    <ResourceListHeaderContainer>
      <ResourceListTitleRow>
        <ResourceListTitle>Explore {ResourceDisplayStrings[slug]}</ResourceListTitle>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ResourceListTitleRow>
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

  return (
    <ResourceListPage>
      <ResourceListGrid>
        <ResourceListHeader onSearch={setSearchValue} slug={slug} />
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} Resource={resource} />
        ))}
      </ResourceListGrid>
    </ResourceListPage>
  )
}
