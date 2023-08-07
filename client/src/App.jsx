import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./Components/Signup";
import Login from './Components/Login'
import Home from "./Components/Home";

function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <Routes>
         <Route exact path='/' element={<Signup/>}/>
         <Route exact path='/Login' element={<Login/>}/>
         <Route exact path = '/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
