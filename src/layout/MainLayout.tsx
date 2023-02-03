import { PropsWithChildren } from 'react'
import {Link} from 'react-router-dom'

import { ButtonLink, styled, Button, Certificate, Text } from '@libellum-ds/react'
import { useTheme } from '../providers/ThemeProvider'

type MainLayoutProps = PropsWithChildren

const Main = styled('main', {
  maxWidth: '1024px',
  margin: '40px auto 0',
  padding: '0 $spacing-sm'
})

const Title = styled(Text, {
  marginTop: '$spacing-sm'
})

const NavContainer = styled('nav', {
  display: 'flex',
  gap: '$spacing-sm',
  padding: '$spacing-sm 0'
})

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { toggleTheme, themeName } = useTheme()

  return (
    <Main>
      <Button onClick={toggleTheme}>
        {themeName === 'light' ? 'dark' : 'light'}
      </Button>

      <Title type="display" as="div">
        <Certificate/> Use Libellum DS <Certificate />
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
