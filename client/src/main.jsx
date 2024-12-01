import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Register, {action as registerAction} from './routes/register'
import ErrorPage from './error-page'
import Login, {action as loginAction} from './routes/login'
import AdminRoot from './routes/admin/adminRoot'
import {action as changeRoleAction} from './routes/admin/users/changeRole'
import {loader as allUsersLoader} from './routes/loaders/allUsersLoader'
import {loader as categoriesLoader} from './routes/loaders/categories'
import {loader as allPostsLoader} from './routes/loaders/allPosts'
import {loader as categoryPostsLoader} from './routes/loaders/categoryPost'
import {loader as membersLoader} from './routes/loaders/members'
import {loader as execsLoader} from './routes/loaders/executives'
import ViewAllUsers from './routes/admin/users/viewAllUsers'
import ViewUsersRoot from './routes/admin/users/viewUsersRoot'
import UserSearch, {loader as userSearchLoader} from './routes/admin/users/userSearch'
import EditUser, {loader as userEditLoader, action as userEditAction} from './routes/admin/users/editUser'
import ViewCategoires from './routes/admin/categories/viewCategories'
import CreateCategory, {
  action as categoryAction,
} from './routes/admin/categories/creeateCategory'
import {action as deleteCategoryAction} from './routes/admin/categories/deleteCategory'
import GetAllPosts from './routes/admin/posts/getAllPosts'
//import { Error } from 'mongoose'
import EditPost, {action as editPostAction, loader as editPostLoader} from './routes/admin/posts/editPost'
import { action as uploadPostImagesAction } from './routes/admin/posts/uploadImages'
import CreatePost, {action as createPostAction} from './routes/admin/posts/createPost'
import SinglePost, { loader as singlePostLoader } from './routes/singlePost'
import { action as logoutAction } from './routes/logout'
import {action as userDeleteAction} from './routes/admin/users/deleteUser'
import Home from './routes/home'
//import App from './App.jsx'
const router = createBrowserRouter([
  {
    index: true,
    element: <Register />,
    action: registerAction,
    errorElement: <ErrorPage />,
  },
  {
    path: '/loaders',
    children: [
      {
        path: '/loaders/allUsers',
        loader: allUsersLoader,
      },
      {
        path: '/loaders/posts',
        loader: allPostsLoader,
      },
      {
        path: '/loaders/categories',
        loader: categoriesLoader,
      },
      {
        path: '/loaders/categoryPosts',
        loader: categoryPostsLoader,
      },
      {
        path: '/loaders/members',
        loader: membersLoader,
      },
      {
        path: '/loaders/executives',
        loader: execsLoader,
      },
    ],
  },
  {
    path: '/home',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home/post/:id',
        element: <SinglePost />,
        loader: singlePostLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/profile/:id',
        element: <EditUser />,
        errorElement: <ErrorPage />,
        action: userEditAction,
        loader: userEditLoader,
      },
      {
            path: "/admin/users/delete/:id",
            action: userDeleteAction
          },
      {
        path: '/admin/users/view',
        element: <ViewUsersRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ViewAllUsers />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/users/view/search',
            element: <UserSearch />,
            loader: userSearchLoader,
            errorElement: <ErrorPage />,
          },
          
        ],
      },
      {
        path: '/admin/posts/create',
        element: <CreatePost />,
        action: createPostAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/posts/view',
        element: <GetAllPosts />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/posts/imagesUpload',
        action: uploadPostImagesAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/posts/edit/:id',
        element: <EditPost />,
        action: editPostAction,
        loader: editPostLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/categories/view',
        element: <ViewCategoires />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/categories/create',
        element: <CreateCategory />,
        action: categoryAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/categories/delete/:id',
        action: deleteCategoryAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin/actions/changeRole',
        action: changeRoleAction,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    action: loginAction,
    errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    action: logoutAction,
    errorElement: <ErrorPage />,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
