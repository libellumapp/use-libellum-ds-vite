import { createBrowserRouter } from "react-router-dom";
import { Components, Home } from "../pages";
import { ComponentButton } from "../pages/ComponentButton";
import { ComponentButtonLink } from "../pages/ComponentButtonLink";
import { ComponentSwitch } from "../pages/ComponentSwitch";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/components",
      element: <Components />,
      children: [
        {
          index: true,
          element: <ComponentButton />
        },
        {
          path: 'button',
          element: <ComponentButton />
        },
        {
          path: 'button-link',
          element: <ComponentButtonLink />
        },
        {
          path: 'switch',
          element: <ComponentSwitch />
        }
      ]
    },
  ]);
