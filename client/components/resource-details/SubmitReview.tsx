import styled from 'styled-components'
import { colours, largerThan, smallerThan, width } from '../../styles'

const SubmitButton = styled.button`
  font-size: 18px;
  background-color: ${colours.primary1};
  color: ${colours.white};
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  border: 3px solid ${colours.primary1};
  cursor: pointer;

  &:hover {
    background-color: ${colours.white};
    color: ${colours.primary1};
  }
`

export const SubmitReview = styled(({ className, name }: { className?: string; name: string }) => {
  return (
    <div className={className}>
      <h3>What are your thoughts on {name}?</h3>
      <SubmitButton>SUBMIT REVIEW</SubmitButton>
    </div>
  )
})`
  @media ${largerThan(width.tablet)} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  margin-bottom: 15px;
`