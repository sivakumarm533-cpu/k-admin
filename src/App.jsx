import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import StockStatus from './components/StockStatus'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleBackOrForward() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleBackOrForward)
    return () => window.removeEventListener('popstate', handleBackOrForward)
  }, [])

  function navigate(path) {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    setIsMenuOpen(false)
  }

  let page

  if (currentPath === '/' || currentPath === '/dashboard') {
    page = <Home />
  } else if (currentPath === '/products') {
    page = <Products />
  } else if (currentPath === '/categories') {
    page = <Categories />
  } else if (currentPath === '/orders') {
    page = <Orders />
  } else if (currentPath === '/stock-status') {
    page = <StockStatus />
  } else if (currentPath === '/settings') {
    page = <Settings />
  } else {
    page = <h1>Page not found</h1>
  }

  return (
    <div className="admin-layout">
      <Navbar
        onMenuClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        onNavigate={navigate}
      />
      <div className="admin-body">
        <SideMenu
          currentPath={currentPath}
          isOpen={isMenuOpen}
          onNavigate={navigate}
        />
        <main className="admin-content" id="main-content">
          {page}
        </main>
      </div>
    </div>
  )
}

export default App
