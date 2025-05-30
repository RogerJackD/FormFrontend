import React from 'react';
import {AppRouter} from './router';
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
      
    </>
  )
}

export default App
