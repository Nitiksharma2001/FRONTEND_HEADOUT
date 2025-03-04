import './App.css'
import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import ContextWrapper, { MainContext } from './context'
export default function RouterHeader() {
  return (
    <BrowserRouter>
      <ContextWrapper>
        <Routes>
          {routes.map((page, i) => (
            <Route key={i} path={`/${page.route}`} element={page.component} />
          ))}
        </Routes>
        <ToastWrapper />
      </ContextWrapper>
    </BrowserRouter>
  )
}

function ToastWrapper() {
  const { toastMessage } = useContext(MainContext)
  if (!toastMessage) return
  return (
    <div className='toast toast-start toast-bottom'>
      <div className='alert alert-info'>
        <span>{toastMessage}</span>
      </div>
    </div>
  )
}
