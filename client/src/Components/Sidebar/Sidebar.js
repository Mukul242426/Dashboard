import React, { useContext } from 'react'
import {BsGrid1X2Fill} from 'react-icons/bs'
import logout from '../../assets/Logout.png'
import styles from './Sidebar.module.css'
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';

function Sidebar({openSidebarToggle, OpenSidebar}) {

  const {setIsLoggedIn}=useContext(UserContext);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    toast.success("Logged out successfully",{position:'top-right'})
    setIsLoggedIn(false);
  }

  return (
    <aside id={styles.sidebar} className={openSidebarToggle ? `${styles.sidebar_responsive}`: ""}>
        <div className={styles.sidebar_title}>
            <div className={styles.sidebar_brand}>
               Admin
            </div>
            <span className={`${styles.icon} ${styles.close_icon}`} onClick={OpenSidebar}>X</span>
        </div>

        <ul className={styles.sidebar_list}>
            <li className={styles.sidebar_list_item}>
                    <BsGrid1X2Fill className={styles.icon}/> Dashboard
            </li>
            <li className={styles.sidebar_list_item} onClick={handleLogout}>
                    <img src={logout} alt="logout" className={styles.icon}/> Logout
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar