import {useContext } from "react";
import ThemeContext from "./contextapp/context";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/About";
import Signin from "./pages/sign/Signin"
import Signup from "./pages/sign/Signup"
import Profile from "./pages/profile";
import Errorpage from "./pages/errorpage";
import Edite from "./pages/edite/edite";

const router = createHashRouter([
  
  {
    path: "/",
    element: <Home />,
    errorElement: <Errorpage/>,
  },
  {
    path: "edite/:stringid",
    element: <Edite />,
  },


  {
    path: "/ABOUT",
    element: <About />,
  },

  {
    path: "/Signin",
    element: <Signin />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);
function App() {
  const {theme} = useContext(ThemeContext);
  return(
    <div className={`${theme}`}>
      
     
  <RouterProvider router={router} />
    </div>
  ) 
}

export default App;
