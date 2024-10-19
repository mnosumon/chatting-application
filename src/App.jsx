import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Registration from './pages/registration/Registration';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Home/>} />
        <Route path='/registration' element={<Registration/>} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  )
}

export default App