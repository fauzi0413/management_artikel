"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeChange from './ThemeChange'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'


function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();
  return (
    <header className="header">
      <nav>
        <div className="logo"><Link href="/about"><Image src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" alt="Logo" width={50} height={50} /></Link></div>
        <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/posts">All Posts</Link>
            {session && (
              <Link href="/posts/my-posts">
                Your Post
              </Link>
            )}
            <Link href="/about">About</Link>
            {session ? (
              <div className="profile-dropdown">
                <button
                  className="profile-btn"
                  onClick={() => setOpenMenu(!openMenu)}
                >
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
              <Link href="/login">Login</Link>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Header