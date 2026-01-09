import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainContent, UserButton } from './components/MainContent'

function App() {
  return (
    <>
      <MainContent />
      <UserButton ammount="+90" />
    </>
  )
}

export default App
