import React from 'react'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Addrecords from '../pages/Addrecords'
import Viewrecords from '../pages/Viewrecords'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/addrecord',
      element:<Addrecords/>
    },
    {
      path : '/viewRecord',
      element:<Viewrecords/>
    }
  ]
)
const App = () => {


  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App
