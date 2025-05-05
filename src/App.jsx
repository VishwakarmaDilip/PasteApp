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
import PrivateRoute from "./components/PrivateRoute";

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
      <PrivateRoute>
        <Navbar />
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/changePassword",
    element: (
      <PrivateRoute>
        <Navbar />
        <ChangePassword />
      </PrivateRoute>
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
      <PrivateRoute>
      <Navbar />
      <UserNotes />
    </PrivateRoute>
    )
  },
  {
    path: "/userNotes/:id",
    element: (
      <PrivateRoute>
        <Navbar />
        < ViewUserPaste/>
      </PrivateRoute>
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
