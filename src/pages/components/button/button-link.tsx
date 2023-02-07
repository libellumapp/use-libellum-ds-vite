import { Link } from 'react-router-dom'

import {
  ButtonLink as LibellumButtonLink,
  Search,
  Text,
} from '@libellum-ds/react'

import { Group } from '../../../components'

export const ButtonLink = () => {
  return (
    <>
      <Text type="display" as="div">
        Link Button
      </Text>
      <Group>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <LibellumButtonLink as={Link} to="/">
            <Search /> Home (Router Link) <Search />
          </LibellumButtonLink>
          <LibellumButtonLink as={Link} to="/components">
            <Search /> Components (Router Link) <Search />
          </LibellumButtonLink>
          <LibellumButtonLink as={Link} to="/" disabled>
            <Search /> Home (Router Link) <Search />
          </LibellumButtonLink>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}
        >
          <LibellumButtonLink href="#">Home (HTML anchor)</LibellumButtonLink>
          <LibellumButtonLink href="#">
            Components Home (HTML anchor)
          </LibellumButtonLink>
          <LibellumButtonLink href="#" disabled>
            Components Home (HTML anchor)
          </LibellumButtonLink>
        </div>
      </Group>
    </>
  )
}
