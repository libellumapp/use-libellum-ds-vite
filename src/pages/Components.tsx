import {
  json,
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from 'react-router-dom'

import { ButtonLink, Certificate, styled, Text } from '@libellum-ds/react'

import { MainLayout } from '../layout/MainLayout'

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0',
})

export type ComponentLoaderData = {
  ok: boolean
}

export const load: LoaderFunction = async (): Promise<ComponentLoaderData> => {
  console.log('passando no load do component')
  return json({
    ok: true,
  } as ComponentLoaderData)
}

export const Components = () => {
  console.log('passando aqui')
  const loadData = useLoaderData() as ComponentLoaderData
  // console.log('loadData.ok at Component',loadData.ok)

  return (
    <MainLayout>
      <Text type="display" as="div">
        <Certificate /> Components <Certificate />
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
