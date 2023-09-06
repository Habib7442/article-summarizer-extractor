import "./App.css";
import Hero from "./components/Hero";
import Extract from "./pages/Extract";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Content from "./pages/Content";

const Layout = () => {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Extract />,
      },
      {
        path: "/summarizer",
        element: <Content />,
      },
    ],
  },
]);
const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </main>
  );
};

export default App;
