import { Button, Search, Text } from '@libellum-ds/react'
import { Group } from '../components'

export const ComponentButton = () => {
  return (
    <>
        <Text type="display" as="div">
          Buttons
        </Text>

        <Group>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button as="a">Primary</Button>
            <Button disabled>Primary Disabled</Button>
            <Button><Search />Primary</Button>
            <Button>Primary<Search /></Button>
            <Button><Search />Primary<Search /></Button>
            <Button disabled><Search />Primary<Search /></Button>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <Button variant="outline">Outlined</Button>
            <Button variant="outline" disabled>Outlined Disabled</Button>
            <Button variant="outline"><Search />Outlined</Button>
            <Button variant="outline">Outlined<Search /></Button>
            <Button variant="outline"><Search />Outlined<Search /></Button>
            <Button variant="outline" disabled><Search />Outlined<Search /></Button>
          </div>
        </Group>
    </>
  )
}
