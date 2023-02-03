import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Components, Home } from "./pages";
import { ThemeProvider } from './providers/ThemeProvider';
import { routes } from './route';
import globalCss from './styles/global'

function App() {
  {globalCss()}
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
