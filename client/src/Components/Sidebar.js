import React from 'react'
import {BsGrid1X2Fill} from 'react-icons/bs'
import logout from '../assets/Logout.png'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
               Admin
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
            </li>
            <li className='sidebar-list-item'>
                    <img src={logout} alt="logout" className='icon'/> Logout
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar