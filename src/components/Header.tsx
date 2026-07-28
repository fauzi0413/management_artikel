"use client"
import React, {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import ThemeChange from './ThemeChange'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt, FaBars, FaTimes, FaUsers, FaFileContract, FaAngleDown, FaHome, FaInfoCircle, FaSignInAlt, FaPenNib } from 'react-icons/fa'
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
        <div className="logo">
          <Link href="/" className="brand-logo">
            <span className="brand-primary">Brozy</span><span className="brand-secondary">News</span>
          </Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
        <div className={`sidebar-overlay ${mobileMenu ? "active" : ""}`} onClick={() => setMobileMenu(false)}></div>
        <div className={`nav-links ${mobileMenu ? "active" : ""}`}>
            <div className="sidebar-header">
              <span className="brand-primary" style={{ color: '#2563eb' }}>Brozy</span><span className="brand-secondary" style={{ color: '#f59e0b' }}>News</span>
            </div>
            <Link href="/" onClick={() => setMobileMenu(false)} className="nav-item-link"><FaHome /> Beranda</Link>
            {session && (
              <Link href="/posts/my-posts" onClick={() => setMobileMenu(false)} className="nav-item-link"><FaPenNib /> Posts Saya</Link>
            )}
            <Link href="/about" onClick={() => setMobileMenu(false)} className="nav-item-link"><FaInfoCircle /> Tentang</Link>
            {mobileMenu && session && (
              <>
              <div className="theme-btn ">
                <ThemeChange />
              </div>
              <div className="mobile-user-menu">

                <div className="mobile-user-info">
                  {session.user?.name}
                </div> 

                {session.user?.role === "admin" && (
                  <>
                    <div className="mobile-section-label">Admin</div>
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="nav-item-link"
                    >
                      <FaChartColumn /> Dashboard
                    </Link>

                    <Link
                      href="/admin/posts"
                      onClick={closeMobileMenu}
                      className="nav-item-link"
                    >
                      <FaFileContract /> Manage Posts
                    </Link>

                    <Link
                      href="/admin/users"
                      onClick={closeMobileMenu}
                      className="nav-item-link"
                    >
                      <FaUsers /> Manage Users
                    </Link>
                  </>
                )}

                <div className="dropdown-divider"></div>

                <button
                  className="mobile-logout-btn nav-item-link"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  <FaSignOutAlt /> Keluar
                </button>
              </div>
              </>
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
                  
                <div className="dropdown-divider"></div>

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
                <Link href="/login" className="login-nav-btn nav-item-link" onClick={() => setMobileMenu(false)}><FaSignInAlt /> Masuk</Link>
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