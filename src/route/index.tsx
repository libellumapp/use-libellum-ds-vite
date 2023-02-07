import { createBrowserRouter } from 'react-router-dom'

import { Home } from '../pages'
import { Components, load as componentLoader } from '../pages/components'
import { ComponentButton } from '../pages/components/button'
import { ButtonArrow } from '../pages/components/button/button-arrow'
import { ButtonLink } from '../pages/components/button/button-link'
import { ButtonSimple } from '../pages/components/button/button-simple'
import { ComponentInput } from '../pages/components/input'
import { InputControlled } from '../pages/components/input/input-controlled'
import { InputUncontrolled } from '../pages/components/input/input-uncontrolled'
import { InputUncontrolledHookForm } from '../pages/components/input/input-uncontrolled-hook-form'
import { ComponentSwitch } from '../pages/components/switch'
import { SwitchControlled } from '../pages/components/switch/switch-controlled'
import {
  action as actionComponentSwitchUncontrolled,
  SwitchUncontrolled,
} from '../pages/components/switch/switch-uncontrolled'

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
        path: 'button',
        element: <ComponentButton />,
        children: [
          {
            index: true,
            element: <ButtonSimple />,
          },
          {
            path: 'simple',
            element: <ButtonSimple />,
          },
          {
            path: 'link',
            element: <ButtonLink />,
          },
          {
            path: 'arrow',
            element: <ButtonArrow />,
          },
        ],
      },
      {
        path: 'input',
        element: <ComponentInput />,
        children: [
          {
            index: true,
            element: <InputControlled />,
          },
          {
            path: 'controlled',
            element: <InputControlled />,
          },
          {
            path: 'uncontrolled',
            element: <InputUncontrolled />,
          },
          {
            path: 'uncontrolled-hook-form',
            element: <InputUncontrolledHookForm />,
          },
        ],
      },
      {
        path: 'switch',
        element: <ComponentSwitch />,
        children: [
          {
            index: true,
            element: <SwitchControlled />,
          },
          {
            path: 'controlled',
            element: <SwitchControlled />,
          },
          {
            path: 'uncontrolled',
            element: <SwitchUncontrolled />,
            action: actionComponentSwitchUncontrolled,
          },
        ],
      },
    ],
  },
])
