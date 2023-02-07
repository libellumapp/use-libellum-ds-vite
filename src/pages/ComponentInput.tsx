import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
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

import { Group } from '../components'

type ControledForm = {
  firstName: string
  lastName: string
  age: number
}

type FormData = {
  firstName: string
  lastName: string
  age: number
}

const initialControlledFieldValues = {
  firstName: '',
  lastName: '',
  age: 0,
}

const schema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Lst name is required'),
    age: yup
      .number()
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .min(10, 'Age is invalid. Must be greater than or equal 10')
      .required('Age is required'),
  })
  .required()

export const ComponentInput = () => {
  const uncontrolledFormRef = useRef<HTMLFormElement | null>(null)
  const firstNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const lastNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)

  const firstNameResultReactHookFormRef = useRef<HTMLParagraphElement | null>(
    null
  )
  const lastNameResultReactHookFormRef = useRef<HTMLParagraphElement | null>(
    null
  )
  const ageResultReactHookFormRef = useRef<HTMLParagraphElement | null>(null)

  const [isControlledFieldsDisabled, setIsControlledFieldsDisabled] =
    useState(false)
  const [isUncontrolledFieldsDisabled, setIsUncontrolledFieldsDisabled] =
    useState(false)
  const [
    isUncontrolledReactHookFormFieldsDisabled,
    setIsUncontrolledReactHookFormFieldsDisabled,
  ] = useState(false)
  const [controlledFields, setControlledFields] = useState<ControledForm>(
    initialControlledFieldValues
  )

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    values: initialControlledFieldValues,
    resolver: yupResolver(schema),
  })

  //=========================================================================
  // Controlled Fields
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

  //=========================================================================
  // Native form uncontrolled foelds
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

  //=========================================================================
  // React Hook Forms
  const handleReactHookFormSubmit = handleSubmit((data) => {
    if (firstNameResultReactHookFormRef.current)
      firstNameResultReactHookFormRef.current.innerHTML = `firstName: ${data.firstName}`

    if (lastNameResultReactHookFormRef.current)
      lastNameResultReactHookFormRef.current.innerText = `lastName: ${data.lastName}`

    if (ageResultReactHookFormRef.current)
      ageResultReactHookFormRef.current.innerText = `age: ${data.age}`
  })

  const cleanUncontrolledReactHookFormFields = () => {
    reset(initialControlledFieldValues)

    if (firstNameResultReactHookFormRef.current)
      firstNameResultReactHookFormRef.current.innerHTML = 'firstName: '
    if (lastNameResultReactHookFormRef.current)
      lastNameResultReactHookFormRef.current.innerText = 'lastName: '
    if (ageResultReactHookFormRef.current)
      ageResultReactHookFormRef.current.innerText = 'age: '
  }

  return (
    <>
      <Text type="display" as="div">
        Input
      </Text>

      {/* Controlled fields */}
      <Group>
        <Text type="title" css={{ marginBottom: '$spacing-xs' }}>
          Controlled
        </Text>

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

      {/* Uncontrolled fields native form */}
      <Group>
        <Text type="title" css={{ marginBottom: '$spacing-xs' }}>
          Uncontrolled
        </Text>

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

      {/* React Hook Form  */}
      <Group>
        <Text type="title" css={{ marginBottom: '$spacing-xs' }}>
          Uncontrolled (React Hook Form)
        </Text>

        <form onSubmit={handleReactHookFormSubmit}>
          <Input
            label="First Name"
            leftIcon={<Person />}
            disabled={isUncontrolledReactHookFormFieldsDisabled}
            onClear={() => {
              resetField('firstName')
            }}
            {...register('firstName')}
            hint={errors.firstName?.message}
            state={!errors.firstName?.message ? 'default' : 'error'}
          />
          <Input
            label="Last Name"
            leftIcon={<PeopleTeam />}
            disabled={isUncontrolledReactHookFormFieldsDisabled}
            onClear={() => {
              resetField('lastName')
            }}
            {...register('lastName')}
            hint={errors.lastName?.message}
            state={!errors.lastName?.message ? 'default' : 'error'}
          />
          <Input
            label="Age"
            type="number"
            leftIcon={<ArrowTrening />}
            disabled={isUncontrolledReactHookFormFieldsDisabled}
            onClear={() => {
              resetField('age')
            }}
            {...register('age')}
            hint={errors.age?.message}
            state={!errors.age?.message ? 'default' : 'error'}
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
              onClick={() =>
                setIsUncontrolledReactHookFormFieldsDisabled((state) => !state)
              }
            >
              {isUncontrolledReactHookFormFieldsDisabled ? (
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

            <Button
              type="button"
              onClick={cleanUncontrolledReactHookFormFields}
            >
              <Delete />
              Clean
            </Button>
          </div>
        </form>

        <Group>
          <Text type="body1" ref={firstNameResultReactHookFormRef}>
            firstName:{' '}
          </Text>
          <Text type="body1" ref={lastNameResultReactHookFormRef}>
            lastName:{' '}
          </Text>
          <Text type="body1" ref={ageResultReactHookFormRef}>
            age:{' '}
          </Text>
        </Group>
      </Group>
    </>
  )
}
