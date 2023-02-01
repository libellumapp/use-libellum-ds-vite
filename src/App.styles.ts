import { styled } from '@libellum-ds/react'

export const Main = styled('div', {
  height: '100vh',
  padding: '0 $spacing-sm',
  backgroundColor: '$color-background'
})

export const ToggleThemeContainer = styled('div', {
  marginBottom: '$spacing-sm'
})

export const ToggleThemeButton = styled('button', {
  border: 'none',
  padding: '$spacing-quarck $spacing-nano'
})

export const Group = styled('div', {
  border: '1px solid $color-neutral-50',
  borderRadius: '$sm',
  padding: '$spacing-nano',
  marginTop: '$spacing-sm'
})