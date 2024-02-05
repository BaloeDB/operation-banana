import ReactDOM from "react-dom/client";
import App from "./Root.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BananaClicker from "./routes/BananaClicker.tsx";
import Home from "./routes/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  <RouterProvider router={router} />
);
