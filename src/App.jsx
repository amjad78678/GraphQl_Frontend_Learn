

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
   path: "/result",
   element: <Result />

    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
