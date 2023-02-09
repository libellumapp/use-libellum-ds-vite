import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import {
  ArrowTrening,
  ArrowUpload,
  Button,
  Delete,
  DropDown,
  DropDownItem,
  DropDownItemValue,
  Input,
  Locked,
  PeopleTeam,
  Person,
  Text,
  Unlocked,
} from '@libellum-ds/react'

import { Group } from '../../../components'

type ControledForm = {
  item: DropDownItemValue | null
  firstName: string
  lastName: string
  age: number
}

const DROPDOWN_ITEMS = [
  { value: 1, label: 'Item 01' },
  { value: 2, label: 'Item 02' },
  { value: 3, label: 'Item 03' },
]

const INITIAL_FORM_VALUES = {
  item: null,
  firstName: '',
  lastName: '',
  age: 0,
}

const INITIAL_FILLED_FORM_VALUES: ControledForm = {
  item: 2,
  firstName: 'Ricardo',
  lastName: 'Ruiz',
  age: 44,
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

  const handleDropDownChange = useCallback(
    (item: DropDownItemValue | undefined) => {
      setFields((state) => ({
        ...state,
        item: item ?? null,
      }))
    },
    []
  )

  const itemLabel = useMemo(
    () =>
      DROPDOWN_ITEMS.find((item) => item.value === fields.item)?.label ?? '',
    [fields.item]
  )

  useEffect(() => {
    // setFields(INITIAL_FORM_VALUES)
    setFields(INITIAL_FILLED_FORM_VALUES)
  }, [])

  return (
    <>
      <Text type="display" as="div">
        Controlled
      </Text>
      <Group>
        <DropDown
          name="item"
          label="Select an item"
          value={fields.item}
          onSelect={handleDropDownChange}
          disabled={isFieldsDisabled}
        >
          <DropDownItem value={undefined}></DropDownItem>
          {DROPDOWN_ITEMS.map(({ value, label }) => (
            <DropDownItem key={value} value={value}>
              {label}
            </DropDownItem>
          ))}
        </DropDown>

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
          <Text type="body1">
            item: {fields.item ? `value=${fields.item} label=${itemLabel}` : ''}
          </Text>
          <Text type="body1">firstName: {fields.firstName}</Text>
          <Text type="body1">lastName: {fields.lastName}</Text>
          <Text type="body1">age: {fields.age}</Text>
        </Group>
      </Group>
    </>
  )
}
