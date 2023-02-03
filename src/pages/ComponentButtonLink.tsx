import { ButtonLink, Certificate, Search, Text } from '@libellum-ds/react'
import { Link } from 'react-router-dom'
import { Group } from '../components'

export const ComponentButtonLink = () => {
  return (
    <>
      <Text type="display" as="div">
        Button Link
      </Text>
      <Group>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <ButtonLink as={Link} to="/">
            <Search /> Home (Router Link) <Search />
          </ButtonLink>
          <ButtonLink as={Link} to="/components">
            <Search /> Components (Router Link) <Search />
          </ButtonLink>
          <ButtonLink as={Link} to="/" disabled>
            <Search /> Home (Router Link) <Search />
          </ButtonLink>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <ButtonLink href="#">Home (HTML anchor)</ButtonLink>
          <ButtonLink href="#">Components Home (HTML anchor)</ButtonLink>
          <ButtonLink href="#" disabled>Components Home (HTML anchor)</ButtonLink>
        </div>
      </Group>
    </>
  )
}
