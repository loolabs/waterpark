import { NavBar } from "../NavBar"
import { render, screen } from '../../utils/tests/test-utils'

describe('NavBar', () => {
  it('renders page options', () => {
    render(<NavBar/>)
    expect(screen.getByText('Events')).toBeInTheDocument()
    expect(screen.getByText('Clubs')).toBeInTheDocument()
  })
})
