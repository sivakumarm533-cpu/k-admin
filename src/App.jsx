import { useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import SideMenu from './components/sidemenu'
import StockStatus from './components/stockstatus'
import EditProduct from './components/EditProduct'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import AuthProvider from './context/AuthProvider'
import useAuth from './context/useAuth'
import './App.css'

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <div className="admin-layout">
      <Navbar
        user={user}
        onLogout={logout}
        onMenuClick={() => setIsMenuOpen((open) => !open)}
      />
      <div className="admin-body">
        <SideMenu isOpen={isMenuOpen} onNavigate={closeMenu} />
        <main className="admin-content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route element={<RequireAuth role="admin" />}>
                <Route path="products/new" element={<EditProduct />} />
                <Route path="products/:id/edit" element={<EditProduct />} />
              </Route>
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="stock-status" element={<StockStatus />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
