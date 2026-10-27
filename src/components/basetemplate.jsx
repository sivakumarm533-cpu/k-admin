import { useState } from 'react'
import Navbar from './navbar'
import SideMenu from './sidemenu'

function BaseTemplate({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <div className="admin-layout">
      <Navbar onMenuClick={() => setIsMenuOpen((open) => !open)} />
      <div className="admin-body">
        <SideMenu isOpen={isMenuOpen} onNavigate={closeMenu} />
        <main className="admin-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default BaseTemplate
