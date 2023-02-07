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
  const uncontrolledFormRef = useRef<HTMLFormElement | null>(null)
  const firstNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const lastNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)

  const [isUncontrolledFieldsDisabled, setIsUncontrolledFieldsDisabled] =
    useState(false)

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

  const cleanUncontrolledFields = () => {
    if (uncontrolledFormRef) uncontrolledFormRef.current?.reset()
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
        <form onSubmit={handleFormSubmit} ref={uncontrolledFormRef}>
          <Input
            name="firstName"
            label="First Name"
            leftIcon={<Person />}
            disabled={isUncontrolledFieldsDisabled}
            onClear={() => {
              console.log('clean firstName ')
            }}
          />
          <Input
            name="lastName"
            label="Last Name"
            leftIcon={<PeopleTeam />}
            disabled={isUncontrolledFieldsDisabled}
            onClear={() => {
              console.log('clean lastName ')
            }}
          />
          <Input
            name="age"
            label="Age"
            type="number"
            leftIcon={<ArrowTrening />}
            disabled={isUncontrolledFieldsDisabled}
            onClear={() => console.log('clean age ')}
            defaultValue={0}
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
              onClick={() => setIsUncontrolledFieldsDisabled((state) => !state)}
            >
              {isUncontrolledFieldsDisabled ? (
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

            <Button type="button" onClick={cleanUncontrolledFields}>
              <Delete />
              Clean
            </Button>
          </div>
        </form>

        <Group>
          <Text type="body1" ref={firstNameResultRef}>
            firstName:{' '}
          </Text>
          <Text type="body1" ref={lastNameResultRef}>
            lastName:{' '}
          </Text>
          <Text type="body1" ref={ageResultRef}>
            age:{' '}
          </Text>
        </Group>
      </Group>
    </>
  )
}
