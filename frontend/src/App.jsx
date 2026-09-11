import React from 'react'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Addrecords from '../pages/Addrecords'
import Viewrecords from '../pages/Viewrecords'
import Norecords from '../pages/Norecords'
import ProtectedRoute from '../components/ProtectedRoute'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<Login />
    },
    {
      path:'/signup',
      element:<Signup />
    },
    {
      path:'/login',
      element:<Login />
    },
    {
      element: <ProtectedRoute />,
      children :[
        {path:'/home', element:<Home />},
        {path:'/addrecord', element:<Addrecords />},
        {path : '/viewRecord',  element:<Viewrecords />},
        {path:'/noRecords',  element:<Norecords />} ,
        {path:'/editrecord/:id', element:<Addrecords />} ,
      ]
    } 
])


const App = () => {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App
