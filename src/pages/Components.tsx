import { Text, Certificate, ButtonLink, styled } from '@libellum-ds/react'
import { json, Link, LoaderFunction, Outlet, useLoaderData } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0'
})

export type ComponentLoaderData = {
  ok: boolean
}

export const load: LoaderFunction = async ({ request }): Promise<ComponentLoaderData> => {
  return json({
    ok: true
  } as ComponentLoaderData)
}

export const Components = ()  => {
  const loadData = useLoaderData() as ComponentLoaderData

  console.log('loadData.ok at Component',loadData.ok)

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

