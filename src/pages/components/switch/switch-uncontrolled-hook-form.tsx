import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowUpload, Button, Switch, Text } from '@libellum-ds/react'

import { Group } from '../../../components'

type FormData = {
  agree: boolean
}

const INITIAL_FORM_VALUES: FormData = {
  agree: false,
}

const FORM_SCHEMA_VALIDATION = yup
  .object({
    agree: yup.boolean(),
  })
  .required()

export const SwitchUncontrolledHookForm = () => {
  const agreeResultRef = useRef<HTMLParagraphElement | null>(null)

  const { control, handleSubmit } = useForm<FormData>({
    values: INITIAL_FORM_VALUES,
    resolver: yupResolver(FORM_SCHEMA_VALIDATION),
  })

  const handleFormSubmit = handleSubmit(({ agree }) => {
    if (agreeResultRef.current)
      agreeResultRef.current.innerHTML = `The submitted value is: ${agree}`
  })

  return (
    <>
      <Text type="display" as="div">
        Uncontrolled - React Hook Form
      </Text>
      <Group>
        <form onSubmit={handleFormSubmit}>
          <Controller
            name="agree"
            control={control}
            render={({ field }) => <Switch {...field} />}
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
          </div>
        </form>

        <Group>
          <Text type="body1" ref={agreeResultRef}>
            The submitted value is:
          </Text>
        </Group>
      </Group>
    </>
  )
}
