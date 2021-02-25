import Home from '../pages/index'
import { render, screen } from '../utils/tests/test-utils'

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Event List')).toBeInTheDocument()
  })
})
