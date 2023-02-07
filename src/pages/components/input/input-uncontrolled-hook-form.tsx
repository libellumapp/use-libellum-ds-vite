import { useRef, useState } from 'react'
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

import { Group } from '../../../components'

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

export const InputUncontrolledHookForm = () => {
  const firstNameResultReactHookFormRef = useRef<HTMLParagraphElement | null>(
    null
  )
  const lastNameResultReactHookFormRef = useRef<HTMLParagraphElement | null>(
    null
  )
  const ageResultReactHookFormRef = useRef<HTMLParagraphElement | null>(null)

  const [
    isUncontrolledReactHookFormFieldsDisabled,
    setIsUncontrolledReactHookFormFieldsDisabled,
  ] = useState(false)

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
        Uncontrolled - React Hook Form
      </Text>
      <Group>
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
