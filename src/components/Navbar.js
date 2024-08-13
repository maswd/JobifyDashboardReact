
import { useState } from 'react'
import { FaAlignRight, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import { Logo } from './Logo'
import Wrapper from '../assets/wrappers/Navbar'
const Navbar = () => {
    const { user, toggleSidebar, logoutUser, showSidebar } = useAppContext()
    const [showLogout, setShowLogout] = useState(false)

    return (
        <Wrapper>
            <div className='nav-center'>
                <button
                    className={showSidebar ? 'toggle-btn ' : 'toggle-btn active'}
                    onClick={toggleSidebar}
                >
                    <FaAlignRight />
                </button>

                <div>
                    <Logo />
                    <h3 className='logo-text'>داشبورد</h3>
                </div>

                <div className='btn-container'>
                    <button className='btn' onClick={() => setShowLogout(!showLogout)}>
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button onClick={() => logoutUser()} className='dropdown-btn'>
                            خروج
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}

export default Navbar