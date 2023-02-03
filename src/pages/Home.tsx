import { Certificate, Text } from '@libellum-ds/react'
import { MainLayout } from '../layout/MainLayout'

export const Home = () => {
  return (
    <MainLayout>
        <Text type="display" as="div">
            <Certificate/>
            Use Libellum DS - Home
            <Certificate />
        </Text>
    </MainLayout>
  )
}
