import { render } from '@testing-library/react'

import { Group } from './Group'

describe('Group', () => {
  it('should render correctly', () => {
    const { container } = render(<Group>Teste</Group>)
    expect(container).toBeInTheDocument()
  })
})
