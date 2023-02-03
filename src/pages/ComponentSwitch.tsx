import { Button, Flag, Switch, Text } from '@libellum-ds/react'
import { useEffect, useRef, useState } from 'react'
import { ActionFunction, Form, useActionData, useRouteLoaderData } from 'react-router-dom'
import { Group } from '../components'
import { ComponentLoaderData } from './Components'

type FormSwitch = HTMLFormElement & {
  elements: {
    uncontrolledSwitch: HTMLInputElement
  }
}

type ActionData = {
  uncontrolledSwitch: string | null
}

export const action: ActionFunction = async ({ request }): Promise<ActionData> => {
  const formData = await request.formData()
  const uncontrolledSwitch = formData.get('uncontrolledSwitch')?.toString() ?? null
  return { uncontrolledSwitch }
}

export const ComponentSwitch = () => {
  const actionData = useActionData() as ActionData
  const componentLoaderData = useRouteLoaderData('components') as ComponentLoaderData

  console.log('componentLoaderData.ok at ComponentSwitch',componentLoaderData.ok)

  const unControlledSwitchRef = useRef<HTMLButtonElement | null>(null)
  const unControlledSwitcMessagehRef = useRef<HTMLParagraphElement | null>(null)
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

  // const handleUnControlledSwitchFormSubmit = (event: React.FormEvent<FormSwitch>) => {
  //   event.preventDefault()
  //   event.currentTarget

  //   const isUncontrolledSwitchChecked = event.currentTarget.elements?.uncontrolledSwitch.checked
  //   if (unControlledSwitcMessagehRef.current) unControlledSwitcMessagehRef.current.innerText = `The submitted value is ${isUncontrolledSwitchChecked ? 'on' : 'off'}`
  // }

  useEffect(() => {
    if (unControlledSwitcMessagehRef.current) unControlledSwitcMessagehRef.current.innerText = `The submitted value is ${actionData?.uncontrolledSwitch ? 'on' : 'off'}`
  }, [actionData?.uncontrolledSwitch])

  return (
    <>
      <Text type="display" as="div">
        Switch
      </Text>

      <Group>
        <Text type="title" css={{ marginBottom: '$spacing-nano'}}>Controlled</Text>
        <Switch checked={swtichValue} onCheckedChange={handleControlledSwitchChange}/>
        <Text type="caption" css={{
            marginTop: '$spacing-nano',
            marginBottom: '$spacing-nano'
          }}>{`The state value is ${swtichValue ? 'on' : 'off'}`}</Text>
      </Group>

      <Group>
        <Text type="title" css={{ marginBottom: '$spacing-nano'}}>UnControlled</Text>

        {/* <form onSubmit={handleUnControlledSwitchFormSubmit}> */}
        <Form method='post'>
          <Switch
            name="uncontrolledSwitch"
            ref={unControlledSwitchRef}
            defaultChecked={swtichValue}
            onClick={handleUnControlledSwitchClick}
          />

          <Text type="caption" ref={unControlledSwitcMessagehRef} css={{
            marginTop: '$spacing-nano',
            marginBottom: '$spacing-nano'
          }}>{`The submitted value is`}</Text>

          <Button>
            <Flag />
            Enviar
          </Button>
        </Form>

      </Group>
    </>
  )
}
