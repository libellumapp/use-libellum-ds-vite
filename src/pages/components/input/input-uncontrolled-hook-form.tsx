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

const INITIAL_FORM_VALUES: FormData = {
  firstName: '',
  lastName: '',
  age: 0,
}

const FORM_SCHEMA_VALIDATION = yup
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
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)

  const firstNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const lastNameResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    values: INITIAL_FORM_VALUES,
    resolver: yupResolver(FORM_SCHEMA_VALIDATION),
  })

  const handleFormSubmit = handleSubmit((data) => {
    if (firstNameResultRef.current)
      firstNameResultRef.current.innerHTML = `firstName: ${data.firstName}`

    if (lastNameResultRef.current)
      lastNameResultRef.current.innerText = `lastName: ${data.lastName}`

    if (ageResultRef.current)
      ageResultRef.current.innerText = `age: ${data.age}`
  })

  const cleanFields = () => {
    reset(INITIAL_FORM_VALUES)

    if (firstNameResultRef.current)
      firstNameResultRef.current.innerHTML = 'firstName: '
    if (lastNameResultRef.current)
      lastNameResultRef.current.innerText = 'lastName: '
    if (ageResultRef.current) ageResultRef.current.innerText = 'age: '
  }

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled - React Hook Form
      </Text>
      <Group>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="First Name"
            leftIcon={<Person />}
            disabled={isFieldsDisabled}
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
            disabled={isFieldsDisabled}
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
            disabled={isFieldsDisabled}
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
