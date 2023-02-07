import { FormEvent, useRef, useState } from 'react'

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

export const InputUncontrolled = () => {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)

  const formRef = useRef<HTMLFormElement | null>(null)
  const ageFieldRef = useRef<HTMLInputElement | null>(null)

  const firstNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const lastNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const firstName = data.get('firstName')?.toString()
    const lastName = data.get('lastName')?.toString()
    const age = data.get('age')?.toString()

    if (firstNameResultRef.current)
      firstNameResultRef.current.innerHTML = `firstName: ${firstName}`

    if (lastNameResultRef.current)
      lastNameResultRef.current.innerText = `lastName: ${lastName}`

    if (ageResultRef.current) ageResultRef.current.innerText = `age: ${age}`
  }

  const cleanFields = () => {
    if (formRef) formRef.current?.reset()
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
