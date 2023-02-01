import { ButtonLink } from "@libellum-ds/react"
import { Link } from "react-router-dom"

function App() {
  return (
    <>
      <ul>
        <li>
          <ButtonLink as={Link} to="/">Home</ButtonLink>
        </li>
        <li>
          <ButtonLink as={Link} to="/components">Components</ButtonLink>
        </li>
      </ul>
    </>
  )
}

export default App
