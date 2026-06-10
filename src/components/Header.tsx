"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeChange from './ThemeChange'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  return (
    <header className="header">
      <nav>
        <div className="logo"><Link href="/about"><Image src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" alt="Logo" width={50} height={50} /></Link></div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
        <div className={`nav-links ${mobileMenu ? "active" : ""}`}>
            <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link href="/posts" onClick={() => setMobileMenu(false)}>All Posts</Link>
            {session && (
              <Link href="/posts/my-posts" onClick={() => setMobileMenu(false)}>Your Posts</Link>
            )}
            <Link href="/about" onClick={() => setMobileMenu(false)}>About</Link>
            {session ? (
              <div className="profile-dropdown">
                <button className="profile-btn" onClick={() => setOpenMenu(!openMenu)}>
                  Halo, {session.user?.name} ▼
                </button>

                {openMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item">
                      <ThemeChange />
                    </div>

                    <button
                      className="dropdown-item logout-item"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      < FaSignOutAlt/>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="guest-actions">
                <Link href="/login" onClick={() => setMobileMenu(false)}>Login</Link>
                <div className="theme-btn">
                  <ThemeChange />
                </div>
              </div>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Header