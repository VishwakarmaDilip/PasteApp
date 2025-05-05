import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import UserNotes from "./components/UserNotes";
import ViewUserPaste from "./components/ViewUserPaste";
import UserProfile from "./components/UserProfile";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/userProfile",
    element: (
      <div>
        <Navbar />
        <UserProfile />
      </div>
    ),
  },
  {
    path: "/changePassword",
    element: (
      <div>
        <Navbar />
        <ChangePassword />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <LogIn/>
      </div>
    )
  },
  {
    path: "/signUp",
    element:(
      <div>
        <SignUp/>
      </div>
    )
  },
  {
    path: "/userNotes",
    element:(
      <div>
      <Navbar />
      <UserNotes />
    </div>
    )
  },
  {
    path: "/userNotes/:id",
    element: (
      <div>
        <Navbar />
        < ViewUserPaste/>
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
