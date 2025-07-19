import React from 'react'
import {Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import Createpage from './pages/Createpage'
import Notedetailpage from './pages/Notedetailpage'
import { toast } from 'react-hot-toast'
const App = () => {
  return (
    <div data-theme="dark">
<Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailpage />} />
      </Routes>
    </div>
  )
}

export default App