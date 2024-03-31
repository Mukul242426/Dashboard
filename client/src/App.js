import {Routes,Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Register from './Components/Register/Register'
import { Toaster } from 'react-hot-toast'
import Login from './Components/Login/Login'
import { useEffect, useState } from 'react'
import { UserContext } from './contexts/UserContext'

function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLoggedIn(true);
    }
  },[])


  return (
    <>
    <Toaster/>
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App