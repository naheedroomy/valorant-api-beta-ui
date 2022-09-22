import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'



function App() {

  return (
    <div className="App text-slate-100 bg-black min-h-screen">
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/signup' element={<SignUpPage/>} />
        </Routes>
    </div>
  )
}

export default App
