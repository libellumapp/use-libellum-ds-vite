import { createBrowserRouter } from "react-router-dom";
import { Components, Home } from "../pages";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/components",
      element: <Components />,
    },
  ]);