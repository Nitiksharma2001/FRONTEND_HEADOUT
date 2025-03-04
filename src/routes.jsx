import React from 'react'
import Home from './pages/home/home'
import MainGame from './pages/game/game'

export const routes = [
  {
    name: 'home',
    route: '/',
    component: <Home />,
  },
  {
    name: 'home',
    route: '/:inviteUsername',
    component: <Home />,
  },
  {
    name: 'game',
    route: '/game',
    component: <MainGame />,
  },
]
