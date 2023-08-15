import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/styles.css';
import App from './components/App';
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import ShowPost from './components/ShowPost';
import Profile from './components/Profile/index.jsx';
import EditProfile from './components/EditProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/new-blog",
    element: <NewBlog />
  },
  {
    path: "/author/title",
    element: <ShowPost />
  },
  {
    path: "/user/profile/*",
    element: <Profile />
  },
  {
    path: "/user/edit_profile",
    element: <EditProfile />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

