import { FormEvent, useEffect, useRef } from 'react'
import {
  ActionFunction,
  useActionData,
  useRouteLoaderData,
} from 'react-router-dom'

import { Button, Flag, Switch, Text } from '@libellum-ds/react'

import { Group } from '../../../components'
import { ComponentLoaderData } from '../../components'

type ActionData = {
  uncontrolledSwitch: string | null
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData()
  const uncontrolledSwitch =
    formData.get('uncontrolledSwitch')?.toString() ?? null
  return { uncontrolledSwitch }
}

export const SwitchUncontrolled = () => {
  const actionData = useActionData() as ActionData
  const componentLoaderData = useRouteLoaderData(
    'components'
  ) as ComponentLoaderData

  console.log(
    'componentLoaderData.ok at ComponentSwitch',
    componentLoaderData.ok
  )

  const switcMessagehRef = useRef<HTMLParagraphElement | null>(null)

  const handleUnControlledSwitchFormSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const uncontrolledSwitchValue = formData
      .get('uncontrolledSwitch')
      ?.toString()

    if (switcMessagehRef.current) {
      const messageValue = uncontrolledSwitchValue ? 'on' : 'off'
      switcMessagehRef.current.innerText = `The submitted value is ${messageValue}`
    }
  }

  useEffect(() => {
    if (switcMessagehRef.current) {
      const messageValue = actionData?.uncontrolledSwitch ? 'on' : 'off'
      switcMessagehRef.current.innerText = `The submitted value is ${messageValue}`
    }
  }, [actionData?.uncontrolledSwitch])

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled
      </Text>

      <Group>
        <form onSubmit={handleUnControlledSwitchFormSubmit}>
          {/* <Form method="post"> */}

          <Switch name="uncontrolledSwitch" />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              columnGap: '10px',
            }}
          >
            <Button>
              <Flag />
              Enviar
            </Button>
          </div>
          {/* </Form> */}
        </form>

        <Group>
          <Text type="body1" ref={switcMessagehRef}>
            The submitted value is:
          </Text>
        </Group>
      </Group>
    </>
  )
}
