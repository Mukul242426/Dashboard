import React from 'react'
import { BsSearch, BsJustify} from 'react-icons/bs'
import styles from './Header.module.css'

function Header({OpenSidebar}) {
  return (
    <header className={styles.header}>
        <div className={styles.menu_icon}>
            <BsJustify className={styles.icon} onClick={OpenSidebar}/>
        </div>
        <div className={styles.header_left}>
            <BsSearch  className={styles.icon}/>
        </div>

    </header>
  )
}

export default Header