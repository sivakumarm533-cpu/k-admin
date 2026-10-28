import { Link } from 'react-router-dom'

function Navbar({ onMenuClick, onLogout, user }) {
  return (
    <header className="admin-navbar">
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-controls="admin-sidebar"
        onClick={onMenuClick}
      >
        <span />
        <span />
        <span />
      </button>

      <Link to="/dashboard" className="navbar-brand">ItemPrice Admin</Link>

      <div className="navbar-tools">
        <span className="navbar-status">{user?.role === 'admin' ? 'Admin' : 'User'}</span>
        <span className="profile-avatar" aria-label="User profile">A</span>
        <button className="logout-button" onClick={onLogout} type="button">Log out</button>
      </div>
    </header>
  )
}

export default Navbar
