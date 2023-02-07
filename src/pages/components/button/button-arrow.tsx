import { ButtonArrow as LibellumButtonArrow, Text } from '@libellum-ds/react'

import { Group } from '../../../components'

export const ButtonArrow = () => {
  return (
    <>
      <Text type="display" as="div">
        Arrow Button
      </Text>

      <Group>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <LibellumButtonArrow direction="up" />
          <LibellumButtonArrow direction="right" />
          <LibellumButtonArrow direction="down" />
          <LibellumButtonArrow direction="left" />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}
        >
          <LibellumButtonArrow direction="up" disabled />
          <LibellumButtonArrow direction="right" disabled />
          <LibellumButtonArrow direction="down" disabled />
          <LibellumButtonArrow direction="left" disabled />
        </div>
      </Group>
    </>
  )
}
