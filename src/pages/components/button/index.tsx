import { Link, Outlet } from 'react-router-dom'

import { ButtonLink, styled, Text } from '@libellum-ds/react'

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0',
})

export const ComponentButton = () => {
  return (
    <>
      <Text type="display" as="div">
        Button
      </Text>

      <NavContainer>
        <ButtonLink as={Link} to="simple">
          Simple Button
        </ButtonLink>

        <ButtonLink as={Link} to="link">
          Link Button
        </ButtonLink>

        <ButtonLink as={Link} to="arrow">
          Arrow Button
        </ButtonLink>
      </NavContainer>

      <Outlet />
    </>
  )
}
