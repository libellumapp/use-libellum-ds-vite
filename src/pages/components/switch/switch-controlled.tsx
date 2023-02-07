import { useEffect, useRef, useState } from 'react'
import { useActionData, useRouteLoaderData } from 'react-router-dom'

import { Switch, Text } from '@libellum-ds/react'

import { Group } from '../../../components'
import { ComponentLoaderData } from '../../components'

type ActionData = {
  uncontrolledSwitch: string | null
}

export const SwitchControlled = () => {
  const actionData = useActionData() as ActionData
  const componentLoaderData = useRouteLoaderData(
    'components'
  ) as ComponentLoaderData

  console.log(
    'componentLoaderData.ok at ComponentSwitch',
    componentLoaderData.ok
  )

  const unControlledSwitcMessagehRef = useRef<HTMLParagraphElement | null>(null)
  const [swtichValue, setSwitchValue] = useState(false)

  const handleControlledSwitchChange = () => {
    setSwitchValue((state) => {
      const newValue = !state

      return newValue
    })
  }

  useEffect(() => {
    if (unControlledSwitcMessagehRef.current) {
      const messageValue = actionData?.uncontrolledSwitch ? 'on' : 'off'
      unControlledSwitcMessagehRef.current.innerText = `The submitted value is ${messageValue}`
    }
  }, [actionData?.uncontrolledSwitch])

  return (
    <>
      <Text type="display" as="div">
        Controlled
      </Text>

      <Group>
        <Switch
          checked={swtichValue}
          onCheckedChange={handleControlledSwitchChange}
        />
        <Text
          type="caption"
          css={{
            marginTop: '$spacing-nano',
            marginBottom: '$spacing-nano',
          }}
        >{`The state value is ${swtichValue ? 'on' : 'off'}`}</Text>
      </Group>
    </>
  )
}
