import { useSearch } from '../hooks'
import { Resource, Id, resourceLookup, capitalizeFirstLetter } from '../../utils'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ResourceCard } from './ResourceCard'
import { PageTitle, width, smallerThan, largerThan, colours, fontInter } from '../../styles'
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
  @media ${smallerThan(width.tablet)} {
    justify-content: start;
  }
  height: 64px;
`

const ResourceListTitle = styled(PageTitle)`
  margin: 0;
  @media ${largerThan(width.mobile)} {
    white-space: nowrap;
    margin-right: 16px;
  }
`

type sortPatternType = (first: Resource, second: Resource) => number

interface ResourceListHeaderProps {
  onSearch: (search: string) => any
  changeSortPattern: (sortPatternType) => void
  slug: string
}

const Row = styled.div`
  display: flex;
  align-items: center;
`

const SortDropdownSelect = styled.select`
  padding: 4px;
  border-radius: 16px;
  font-size: 16px;
  background: white;
  font-family: ${fontInter};
  &:hover {
    background: ${colours.neutralLight1};
  }
  height: 32px;
  @media ${largerThan(width.tablet)} {
    padding: 8px;
    border-radius: 24px;
    height: 48px;
  }

  &:focus {
    outline: none;
    border-color: ${colours.primary2};
  }
`

const SortByLabel = styled.label`
  margin-right: 10px;
`

const SortDropdown = ({
  slug,
  changeSortPattern,
}: {
  slug: string
  changeSortPattern: (sortPatternType) => void
}) => {
  let criteria = resourceLookup[slug]['criteria']
  const sortingDefinitions = {
    alphabetical: (first: Resource, second: Resource) => {
      return first.name.localeCompare(second.name) // sort from least (a) to most (z)
    },
    'number of ratings': (first: Resource, second: Resource) => {
      return second.totalReviews - first.totalReviews // sort from most to least
    },
  }

  for (const item of criteria) {
    sortingDefinitions[item] = (first: Resource, second: Resource) => {
      return second.averageRating[item] - first.averageRating[item] // sort from most to least
    }
  }

  const capitalizedCriteria = criteria.map((item) => capitalizeFirstLetter(item))
  capitalizedCriteria.unshift('Alphabetical', 'Number of Ratings')
  const [selected, setSelected] = useState(capitalizedCriteria[0])

  return (
    <Row>
      <SortByLabel>Sort: </SortByLabel>
      <SortDropdownSelect
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value)
          changeSortPattern(sortingDefinitions[e.target.value.toLowerCase()])
        }}
      >
        {capitalizedCriteria.map((text, index) => (
          <option key={index} value={text}>
            {text}
          </option>
        ))}
      </SortDropdownSelect>
    </Row>
  )
}

const ShowSmallerThanLaptop = styled.div`
  @media ${largerThan(width.laptop)} {
    display: none;
  }
`

const ShowLargerThanLaptop = styled.div`
  @media ${smallerThan(width.laptop)} {
    display: none;
  }
`

const ShowSmallerThanMobile = styled.div`
  @media ${largerThan(width.mobile)} {
    display: none;
  }
`

const ShowLargerThanMobile = styled.div`
  @media ${smallerThan(width.mobile)} {
    display: none;
  }
`

const ResourceListHeader = ({ onSearch, changeSortPattern, slug }: ResourceListHeaderProps) => {
  return (
    <ResourceListHeaderContainer>
      <ResourceListTitleRow>
        <ResourceListTitle>Explore {resourceLookup[slug]['title']}</ResourceListTitle>

        <Row>
          <ShowLargerThanLaptop>
            <SortDropdown changeSortPattern={changeSortPattern} slug={slug} />
          </ShowLargerThanLaptop>
          <ShowLargerThanMobile>
            <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
          </ShowLargerThanMobile>
        </Row>
      </ResourceListTitleRow>

      <ShowSmallerThanMobile>
        <SearchInput onChange={(e) => onSearch(e.target.value)} placeholder="Search" />
      </ShowSmallerThanMobile>
      <ShowSmallerThanLaptop>
        <SortDropdown changeSortPattern={changeSortPattern} slug={slug} />
      </ShowSmallerThanLaptop>

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

  const [sortPattern, setSortPattern] = useState(() => (first: Resource, second: Resource) => {
    return first.name.localeCompare(second.name)
  })

  const changeSortPattern = (sortPattern) => {
    setSortPattern(() => sortPattern)
  }
  filteredResources.sort(sortPattern)

  return (
    <ResourceListPage>
      <ResourceListGrid>
        <ResourceListHeader
          changeSortPattern={changeSortPattern}
          onSearch={setSearchValue}
          slug={slug}
        />
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} Resource={resource} />
        ))}
      </ResourceListGrid>
    </ResourceListPage>
  )
}
