import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import Home from "./Componenets/Home";
import Paste from "./Componenets/Paste";
import Viewpaste from "./Componenets/Viewpaste";
import Errorelement from "./Componenets/Errorelement";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
    errorElement: <Errorelement />,
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
    errorElement: <Errorelement />,
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <Viewpaste />
      </div>
    ),
    errorElement: <Errorelement />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />
    </div>
  );
}

export default App;
