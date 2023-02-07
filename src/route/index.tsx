import { createBrowserRouter } from 'react-router-dom'

import { Home } from '../pages'
import { ComponentButton } from '../pages/ComponentButton'
import { ComponentButtonLink } from '../pages/ComponentButtonLink'
import { ComponentInput } from '../pages/ComponentInput'
import { Components, load as componentLoader } from '../pages/Components'
import {
  action as componentSwitchAction,
  ComponentSwitch,
} from '../pages/ComponentSwitch'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    id: 'components',
    path: '/components',
    element: <Components />,
    loader: componentLoader,
    children: [
      {
        index: true,
        element: <ComponentButton />,
      },
      {
        path: 'button',
        element: <ComponentButton />,
      },
      {
        path: 'button-link',
        element: <ComponentButtonLink />,
      },
      {
        path: 'switch',
        element: <ComponentSwitch />,
        action: componentSwitchAction,
      },
      {
        path: 'input',
        element: <ComponentInput />,
      },
    ],
  },
])
