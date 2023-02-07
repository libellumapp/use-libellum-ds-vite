import { ChangeEvent, useState } from 'react'

import {
  ArrowTrening,
  ArrowUpload,
  Button,
  Delete,
  Input,
  Locked,
  PeopleTeam,
  Person,
  Text,
  Unlocked,
} from '@libellum-ds/react'

import { Group } from '../../../components'

type ControledForm = {
  firstName: string
  lastName: string
  age: number
}

const initialControlledFieldValues: ControledForm = {
  firstName: '',
  lastName: '',
  age: 0,
}

export const InputControlled = () => {
  const [isControlledFieldsDisabled, setIsControlledFieldsDisabled] =
    useState(false)

  const [controlledFields, setControlledFields] = useState<ControledForm>(
    initialControlledFieldValues
  )

  const changeControlledFieldValue = (field: string, value: string) => {
    setControlledFields((state) => ({
      ...state,
      [field]: value,
    }))
  }

  const cleanControlledFields = () => {
    setControlledFields(initialControlledFieldValues)
  }

  const handleControlledFieldChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const field = event.currentTarget.name
    const value = event.currentTarget.value
    changeControlledFieldValue(field, value)
  }

  return (
    <>
      <Text type="display" as="div">
        Controlled
      </Text>
      <Group>
        <Input
          name="firstName"
          label="First Name"
          leftIcon={<Person />}
          disabled={isControlledFieldsDisabled}
          value={controlledFields.firstName}
          onChange={handleControlledFieldChange}
          onClear={() => changeControlledFieldValue('firstName', '')}
        />
        <Input
          name="lastName"
          label="Last Name"
          leftIcon={<PeopleTeam />}
          disabled={isControlledFieldsDisabled}
          value={controlledFields.lastName}
          onChange={handleControlledFieldChange}
          onClear={() => changeControlledFieldValue('lastName', '')}
        />
        <Input
          name="age"
          label="Age"
          type="number"
          leftIcon={<ArrowTrening />}
          disabled={isControlledFieldsDisabled}
          value={controlledFields.age}
          onChange={handleControlledFieldChange}
          onClear={() => changeControlledFieldValue('age', '')}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            columnGap: '10px',
          }}
        >
          <Button>
            <ArrowUpload />
            Send
          </Button>

          <Button
            type="button"
            onClick={() => setIsControlledFieldsDisabled((state) => !state)}
          >
            {isControlledFieldsDisabled ? (
              <>
                <Unlocked />
                Enable Fields
              </>
            ) : (
              <>
                <Locked />
                Disable Fields
              </>
            )}
          </Button>
          <Button type="button" onClick={cleanControlledFields}>
            <Delete />
            Clean
          </Button>
        </div>

        <Group>
          <Text type="body1">firstName: {controlledFields.firstName}</Text>
          <Text type="body1">lastName: {controlledFields.lastName}</Text>
          <Text type="body1">age: {controlledFields.age}</Text>
        </Group>
      </Group>
    </>
  )
}
