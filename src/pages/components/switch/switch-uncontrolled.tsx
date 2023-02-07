import { useEffect, useRef } from 'react'
import {
  ActionFunction,
  Form,
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

  const unControlledSwitchRef = useRef<HTMLButtonElement | null>(null)
  const unControlledSwitcMessagehRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (unControlledSwitcMessagehRef.current) {
      const messageValue = actionData?.uncontrolledSwitch ? 'on' : 'off'
      unControlledSwitcMessagehRef.current.innerText = `The submitted value is ${messageValue}`
    }
  }, [actionData?.uncontrolledSwitch])

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled
      </Text>

      <Group>
        {/* <form onSubmit={handleUnControlledSwitchFormSubmit}> */}
        <Form method="post">
          <Switch name="uncontrolledSwitch" ref={unControlledSwitchRef} />

          <Text
            type="caption"
            ref={unControlledSwitcMessagehRef}
            css={{
              marginTop: '$spacing-nano',
              marginBottom: '$spacing-nano',
            }}
          >{`The submitted value is`}</Text>

          <Button>
            <Flag />
            Enviar
          </Button>
        </Form>
      </Group>
    </>
  )
}
