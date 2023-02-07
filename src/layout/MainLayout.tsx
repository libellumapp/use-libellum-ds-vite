import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { Button, ButtonLink, Logo, styled, Text } from '@libellum-ds/react'

import { useTheme } from '../providers/ThemeProvider'

type MainLayoutProps = PropsWithChildren

const Main = styled('main', {
  maxWidth: '1024px',
  margin: '40px auto 0',
  padding: '0 $spacing-sm',
})

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const Title = styled(Text, {
  marginTop: '$spacing-sm',
})

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0',
})

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { toggleTheme, themeName } = useTheme()

  return (
    <Main>
      <Header>
        <Logo size="large" onClick={() => console.log('Logo clicked')} />

        <Button onClick={toggleTheme}>
          {themeName === 'light' ? 'dark' : 'light'}
        </Button>
      </Header>

      <Title type="display" as="div">
        Use Libellum DS
      </Title>

      <NavContainer>
        <ButtonLink as={Link} to="/">
          Home
        </ButtonLink>

        <ButtonLink as={Link} to="/components">
          Components
        </ButtonLink>
      </NavContainer>

      {children}
    </Main>
  )
}
