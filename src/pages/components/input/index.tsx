import { Link, Outlet } from 'react-router-dom'

import { ButtonLink, styled, Text } from '@libellum-ds/react'

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0',
})

export const ComponentInput = () => {
  return (
    <>
      <Text type="display" as="div">
        Input
      </Text>

      <NavContainer>
        <ButtonLink as={Link} to="controlled">
          Controlled
        </ButtonLink>

        <ButtonLink as={Link} to="uncontrolled">
          Uncontrolled
        </ButtonLink>

        <ButtonLink as={Link} to="uncontrolled-hook-form">
          Uncontrolled - React Hook Form
        </ButtonLink>
      </NavContainer>

      <Outlet />
    </>
  )
}
