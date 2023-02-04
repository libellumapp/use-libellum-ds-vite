import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './providers/ThemeProvider'
import globalCss from './styles/global'
import { routes } from './route'

function App() {
  {
    globalCss()
  }
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
