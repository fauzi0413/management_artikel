"use client"
import React, {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeChange from './ThemeChange'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt, FaBars, FaTimes, FaUsers, FaFileContract, FaAngleDown } from 'react-icons/fa'
import { FaChartColumn } from 'react-icons/fa6'

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  const closeMobileMenu = () => {
    setMobileMenu(false);
    setOpenMenu(false);
  };
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  
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
            <div className="theme-btn desktop-hide">
              <ThemeChange />
            </div>
            {mobileMenu && session && (
              <div className="mobile-user-menu">

                <div className="mobile-user-info">
                  {session.user?.name}
                </div>

                {session.user?.role === "admin" && (
                  <>
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/admin/posts"
                      onClick={closeMobileMenu}
                    >
                      Manage Posts
                    </Link>

                    <Link
                      href="/admin/users"
                      onClick={closeMobileMenu}
                    >
                      Manage Users
                    </Link>
                  </>
                )}

                <button
                  className="mobile-logout-btn"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Logout
                </button>
              </div>
            )}
            {session ? (
              !mobileMenu && (
              <div className="profile-dropdown" ref={dropdownRef}>
                <button className="profile-btn" onClick={() => setOpenMenu(!openMenu)}>
                  Halo, {session.user?.name} <FaAngleDown />
                </button>

                {openMenu && (
                  <div className="dropdown-menu">
                  {session.user?.role === "admin" && (
                    <>
                      <Link
                        href="/admin"
                        className="dropdown-item icon-color"
                      >
                        <FaChartColumn /> Dashboard
                      </Link>

                      <Link
                        href="/admin/posts"
                        className="dropdown-item icon-color"
                      >
                        <FaFileContract /> Manage Posts
                      </Link>

                      <Link
                        href="/admin/users"
                        className="dropdown-item icon-color"
                      >
                        <FaUsers /> Manage Users
                      </Link>
                    </>
                  )}
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
              )
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