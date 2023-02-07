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

const INITIAL_FORM_VALUES: ControledForm = {
  firstName: '',
  lastName: '',
  age: 0,
}

export const InputControlled = () => {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)
  const [fields, setFields] = useState<ControledForm>(INITIAL_FORM_VALUES)

  const changeFieldValue = (field: string, value: string) => {
    setFields((state) => ({
      ...state,
      [field]: value,
    }))
  }

  const cleanFields = () => {
    setFields(INITIAL_FORM_VALUES)
  }

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.currentTarget.name
    const value = event.currentTarget.value
    changeFieldValue(field, value)
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
          disabled={isFieldsDisabled}
          value={fields.firstName}
          onChange={handleFieldChange}
          onClear={() => changeFieldValue('firstName', '')}
        />
        <Input
          name="lastName"
          label="Last Name"
          leftIcon={<PeopleTeam />}
          disabled={isFieldsDisabled}
          value={fields.lastName}
          onChange={handleFieldChange}
          onClear={() => changeFieldValue('lastName', '')}
        />
        <Input
          name="age"
          label="Age"
          type="number"
          leftIcon={<ArrowTrening />}
          disabled={isFieldsDisabled}
          value={fields.age}
          onChange={handleFieldChange}
          onClear={() => changeFieldValue('age', '0')}
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
            onClick={() => setIsFieldsDisabled((state) => !state)}
          >
            {isFieldsDisabled ? (
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

          <Button type="button" onClick={cleanFields}>
            <Delete />
            Clean
          </Button>
        </div>

        <Group>
          <Text type="body1">firstName: {fields.firstName}</Text>
          <Text type="body1">lastName: {fields.lastName}</Text>
          <Text type="body1">age: {fields.age}</Text>
        </Group>
      </Group>
    </>
  )
}
