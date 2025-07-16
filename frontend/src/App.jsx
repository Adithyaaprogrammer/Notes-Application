import React from 'react'
import {Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import Createpage from './pages/Createpage'
import Notedetailpage from './pages/Notedetailpage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailpage />} />
      </Routes>
    </div>
  )
}

export default App