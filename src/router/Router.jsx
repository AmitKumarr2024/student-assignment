import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Students from "../Pages/Students";
import ProtectedRoutes from "../ProtectedRoutes";
import StudentsEdit from "../components/StudentsEdit";
import StudentsDetail from "../Pages/StudentsDetail"; 
import AddStudent from "../components/AddStudent";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "addStudents",
            element: <Students />,
          },
          {
            path: "studentDetails/:id",
            element: <StudentsDetail />,
          },
          {
            path: "studentEdit/:id",
            element: <StudentsEdit />,
          },
          {
            path: "addStudent",
            element: <AddStudent />,
          }
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default Router;
