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

  const switcMessagehRef = useRef<HTMLParagraphElement | null>(null)
  const [swtichValue, setSwitchValue] = useState(true)

  const handleSwitchChange = (value: boolean) => {
    setSwitchValue(value)
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
        Controlled
      </Text>

      <Group>
        <Switch value={swtichValue} onChange={handleSwitchChange} />

        <Group>
          <Text type="body1" ref={switcMessagehRef}>
            {`The submitted value is: ${swtichValue ? 'on' : 'off'}`}
          </Text>
        </Group>
      </Group>
    </>
  )
}
