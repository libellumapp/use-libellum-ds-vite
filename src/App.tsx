import { Text, Certificate, styled, darkMode, Switch } from '@libellum-ds/react'
import { colors } from '@libellum-ds/tokens'
import React, { useRef, useState } from 'react'

const Main = styled('div', {
  height: '100vh',
  padding: '0 $spacing-sm',
  
  variants: {
    isDark: {
      true: {
        backgroundColor: '$color-neutral-90'
      },
      false: {
        backgroundColor: '$color-neutral-10'
      }
    }
  }
})
const ToggleThemeContainer = styled('div', {
  marginBottom: '$spacing-sm'
})
const ToggleThemeButton = styled('button', {
  border: 'none',
  padding: '$spacing-quarck $spacing-nano'
})
const Group = styled('div', {
  border: '1px solid $color-neutral-50',
  borderRadius: '$sm',
  padding: '$spacing-nano',
  marginTop: '$spacing-sm'
})

type FormSwitch = HTMLFormElement & {
  elements: {
    uncontrolledSwitch: HTMLInputElement
  }
}

function App() {
  const unControlledSwitchRef = useRef<HTMLButtonElement | null>(null)
  const unControlledSwitcMessagehRef = useRef<HTMLParagraphElement | null>(null)

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [swtichValue, setSwitchValue] = useState(false)

  const handleControlledSwitchChange = () => {
    setSwitchValue(state => {
      const newValue = !state

      // Click on uncontrolled switch when state changes
      if (unControlledSwitchRef.current) {
        unControlledSwitchRef.current.click()
      }

      return newValue
    })
  }

  const handleUnControlledSwitchClick = () => {
    const wasChecked = unControlledSwitchRef.current?.ariaChecked === 'true'
    setSwitchValue(!wasChecked)
  }

  const handleUnControlledSwitchFormSubmit = (event: React.FormEvent<FormSwitch>) => {
    event.preventDefault()
    event.currentTarget

    console.log(event.currentTarget.elements?.uncontrolledSwitch.value)
    console.log(unControlledSwitchRef.current?.value)

    const isUncontrolledSwitchChecked = event.currentTarget.elements?.uncontrolledSwitch.checked
    if (unControlledSwitcMessagehRef.current) unControlledSwitcMessagehRef.current.innerText = `The state is ${isUncontrolledSwitchChecked ? 'on' : 'off'}`
  }

  return (
    <Main className={theme === 'dark' ? darkMode: ''} isDark={theme === 'dark'}>
      <ToggleThemeContainer>
        <ToggleThemeButton onClick={() => setTheme(state => state === 'light' ? 'dark' : 'light')}>
          {theme.toUpperCase()} 
        </ToggleThemeButton>
      </ToggleThemeContainer>

      <Text type="display">
        <Certificate/>
        Use Libellum DS
        <Certificate />
      </Text>

      <Group>
        <Text type="title">Controlled Switch</Text>
        <Switch size="small" checked={swtichValue} onCheckedChange={handleControlledSwitchChange}/>
        <Text type="caption">{`The state is ${swtichValue ? 'on' : 'off'}`}</Text>
      </Group>

      <Group>
        <Text type="title">UnControlled Switch</Text>
        <form onSubmit={handleUnControlledSwitchFormSubmit}>
          <Switch 
            name="uncontrolledSwitch" 
            ref={unControlledSwitchRef} 
            defaultChecked={swtichValue} 
            onClick={handleUnControlledSwitchClick} 
          />
          <Text type="caption" ref={unControlledSwitcMessagehRef}>{`The state is`}</Text>
          <button>Enviar</button>
        </form>
      </Group>
    </Main>
  )
}

export default App
