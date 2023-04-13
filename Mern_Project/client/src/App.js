import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Profile from '../src/components/Profile';
import EditProfile from './components/EditProfile'
const App = () => {
  return (
    
    <Routes>
      <Route path='/home' element={<Dashboard/>}/>
      <Route path="/" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Chat" element={<Chat/>} />
      <Route path="/profile/:id" element={<Profile/>} />
      <Route path="/Edit/profile/:id" element={<EditProfile/>} />
    </Routes>
    
  )
}

export default App