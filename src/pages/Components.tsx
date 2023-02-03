import { Text, Certificate, ButtonLink, styled } from '@libellum-ds/react'
import { Link, Outlet } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0'
})

export const Components = ()  => {
  return (
    <MainLayout>

      <Text type="display" as="div">
        <Certificate/> Components <Certificate />
      </Text>

      <NavContainer>
          <ButtonLink as={Link} to="button">
              Buttons
          </ButtonLink>

          <ButtonLink as={Link} to="button-link">
              Button Link
          </ButtonLink>

          <ButtonLink as={Link} to="switch">
              Switch
          </ButtonLink>
      </NavContainer>

      <Outlet />

    </MainLayout>
  )
}

