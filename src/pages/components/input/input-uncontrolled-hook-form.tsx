import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  ArrowTrening,
  ArrowUpload,
  Button,
  Delete,
  Input,
  Locked,
  Password,
  Person,
  Switch,
  Text,
  Unlocked,
} from '@libellum-ds/react'

import { Group } from '../../../components'

type FormData = {
  user: string
  password: string
  age: number
  agreement: boolean
}

const INITIAL_FORM_VALUES: FormData = {
  user: '',
  password: '',
  age: 0,
  agreement: false,
}

const FORM_SCHEMA_VALIDATION = yup
  .object({
    user: yup
      .string()
      .required('User is required')
      .min(5, 'User must be at least 5 characters long'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters long'),
    age: yup
      .number()
      .required('Age is required')
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .min(10, 'Age is invalid. Must be greater than or equal 10'),
    agreement: yup.boolean(),
  })
  .required()

export const InputUncontrolledHookForm = () => {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)

  const userResultRef = useRef<HTMLParagraphElement | null>(null)
  const passwordResultRef = useRef<HTMLParagraphElement | null>(null)
  const ageResultRef = useRef<HTMLParagraphElement | null>(null)
  const agreementResultRef = useRef<HTMLParagraphElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    formState: { errors },
  } = useForm<FormData>({
    values: INITIAL_FORM_VALUES,
    resolver: yupResolver(FORM_SCHEMA_VALIDATION),
  })

  const handleFormSubmit = handleSubmit((data) => {
    if (userResultRef.current)
      userResultRef.current.innerHTML = `user: ${data.user}`

    if (passwordResultRef.current)
      passwordResultRef.current.innerText = `password: ${data.password}`

    if (ageResultRef.current)
      ageResultRef.current.innerText = `age: ${data.age}`

    if (agreementResultRef.current)
      agreementResultRef.current.innerText = `agreement: ${data.agreement}`
  })

  const cleanFields = () => {
    reset(INITIAL_FORM_VALUES)

    if (userResultRef.current) userResultRef.current.innerHTML = 'user: '
    if (passwordResultRef.current)
      passwordResultRef.current.innerText = 'password: '
    if (ageResultRef.current) ageResultRef.current.innerText = 'age: '
    if (agreementResultRef.current)
      agreementResultRef.current.innerText = 'agreement: '
  }

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled - React Hook Form
      </Text>
      <Group>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="User"
            leftIcon={<Person />}
            disabled={isFieldsDisabled}
            onClear={() => {
              resetField('user')
            }}
            {...register('user')}
            hint={errors.user?.message}
            state={!errors.user?.message ? 'default' : 'error'}
          />
          <Input
            type="password"
            label="Password"
            leftIcon={<Password />}
            disabled={isFieldsDisabled}
            onClear={() => {
              resetField('password')
            }}
            {...register('password')}
            hint={errors.password?.message}
            state={!errors.password?.message ? 'default' : 'error'}
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
          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                }}
              >
                <Switch {...field} disabled={isFieldsDisabled} />
                <label htmlFor="agreement">Agreement</label>
              </div>
            )}
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
          <Text type="body1" ref={userResultRef}>
            user:
          </Text>
          <Text type="body1" ref={passwordResultRef}>
            password:
          </Text>
          <Text type="body1" ref={ageResultRef}>
            age:
          </Text>
          <Text type="body1" ref={agreementResultRef}>
            agreement:
          </Text>
        </Group>
      </Group>
    </>
  )
}
