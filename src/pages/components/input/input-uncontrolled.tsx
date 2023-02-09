import { FormEvent, useRef, useState } from 'react'

import {
  ArrowTrening,
  ArrowUpload,
  Button,
  Delete,
  DropDown,
  DropDownItem,
  Input,
  Locked,
  PeopleTeam,
  Person,
  Text,
  Unlocked,
} from '@libellum-ds/react'

import { Group } from '../../../components'

const DROPDOWN_ITEMS = [
  { value: 1, label: 'Item 01' },
  { value: 2, label: 'Item 02' },
  { value: 3, label: 'Item 03' },
]

export const InputUncontrolled = () => {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)
  const ageFieldRef = useRef<HTMLInputElement | null>(null)
  const itemldRef = useRef<HTMLInputElement | null>(null)

  const firstNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const lastNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)
  const itemResultRef = useRef<HTMLParagraphElement | null>(null)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const firstName = data.get('firstName')?.toString()
    const lastName = data.get('lastName')?.toString()
    const age = data.get('age')?.toString()
    const item = data.get('item')?.toString()

    if (itemResultRef.current) itemResultRef.current.innerText = `item: ${item}`

    if (firstNameResultRef.current)
      firstNameResultRef.current.innerHTML = `firstName: ${firstName}`

    if (lastNameResultRef.current)
      lastNameResultRef.current.innerText = `lastName: ${lastName}`

    if (ageResultRef.current) ageResultRef.current.innerText = `age: ${age}`
  }

  const cleanFields = () => {
    if (formRef) formRef.current?.reset()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    itemldRef.current?.reset()

    if (itemResultRef.current) itemResultRef.current.innerHTML = 'item: '
    if (firstNameResultRef.current)
      firstNameResultRef.current.innerHTML = 'firstName: '
    if (lastNameResultRef.current)
      lastNameResultRef.current.innerText = 'lastName: '
    if (ageResultRef.current) ageResultRef.current.innerText = 'age: '
  }

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled
      </Text>
      <Group>
        <form onSubmit={handleFormSubmit} ref={formRef}>
          <DropDown
            name="item"
            label="Select an item"
            ref={itemldRef}
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
            onClear={() => {
              console.log('clean firstName ')
            }}
          />
          <Input
            name="lastName"
            label="Last Name"
            leftIcon={<PeopleTeam />}
            disabled={isFieldsDisabled}
            onClear={() => {
              console.log('clean lastName ')
            }}
          />
          <Input
            name="age"
            label="Age"
            type="number"
            leftIcon={<ArrowTrening />}
            disabled={isFieldsDisabled}
            onClear={() => {
              if (ageFieldRef.current) ageFieldRef.current.value = '0'
            }}
            defaultValue={0}
            ref={ageFieldRef}
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
        </form>

        <Group>
          <Text type="body1" ref={itemResultRef}>
            item:
          </Text>
          <Text type="body1" ref={firstNameResultRef}>
            firstName:
          </Text>
          <Text type="body1" ref={lastNameResultRef}>
            lastName:
          </Text>
          <Text type="body1" ref={ageResultRef}>
            age:
          </Text>
        </Group>
      </Group>
    </>
  )
}
