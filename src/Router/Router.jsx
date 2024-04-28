import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Pages/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import JobDetails from "../Pages/JobDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/", element: <Home />},
        {path: "/post-job", element: <PrivateRoute><PostJob/></PrivateRoute>},
        {path: "/my-job", element: <PrivateRoute><MyJobs/></PrivateRoute>},
        {path: "/salary", element: <SalaryPage/>},
        {path: "edit-job/:id", element: <UpdateJob/>, loader:({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)},
        {path: "/job/:id", element: <JobDetails/>}
      ],
    },
    {path: "/login", element: <Login/>},
  ]);

  export default router;