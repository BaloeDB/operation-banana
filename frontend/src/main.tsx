import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BananaClicker from "./routes/BananaClicker.tsx";
import Home from "./routes/Home.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "banana-clicker",
        element: <BananaClicker />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
