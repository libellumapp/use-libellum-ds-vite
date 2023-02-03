import { PropsWithChildren, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import { Search, ButtonLink, styled, Button } from '@libellum-ds/react'

import { Group } from '../components'
import { useTheme } from '../providers/ThemeProvider'

type MainLayoutProps = PropsWithChildren

export const Main = styled('main', {
  height: '100vh',
  backgroundColor: '$color-background'
})

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { toggleTheme, themeName } = useTheme()

  const handleToggleTheme = () => {
    toggleTheme()
  }

  return (
    <main>
      <Button onClick={handleToggleTheme}>
          {themeName.toUpperCase()}
      </Button>

      <Group>
          <ButtonLink as={Link} to="/">
              <Search />
              Home (Router Link)
              <Search />
          </ButtonLink>

          <ButtonLink as={Link} to="/components">
              <Search />
              Components (Router Link)
              <Search />
          </ButtonLink>
      </Group>

      {children}
    </main>
  )
}
