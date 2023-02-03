import { Certificate, Text } from "@libellum-ds/react"
import { MainLayout } from "./layout/MainLayout"

function App() {
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

export default App
