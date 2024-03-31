import { useContext, useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Home from '../Home/Home'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate=useNavigate()
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('token'))){
     setIsLoggedIn(true)
    }
    else{
     navigate('/login')
    }
   },[isLoggedIn])


  return (
    <div className={styles.grid_container}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Dashboard