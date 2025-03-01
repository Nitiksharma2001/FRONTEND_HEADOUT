import './App.css'
import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { MainContext } from './context'
export default function RouterHeader() {
  const { toastMessage } = useContext(MainContext)
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((page, i) => (
          <Route key={i} path={`/${page.route}`} element={page.component} />
        ))}
      </Routes>
      {toastMessage && (
        <div className='toast toast-start toast-bottom'>
          <div className='alert alert-info'>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}
