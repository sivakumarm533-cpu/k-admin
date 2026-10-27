function Navbar({ onMenuClick }) {
  return (
    <header className="admin-navbar">
      <button
        aria-label="Toggle navigation menu"
        aria-controls="admin-sidebar"
        className="menu-toggle"
        onClick={onMenuClick}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <a className="navbar-brand" href="#dashboard">ItemPrice Admin</a>

      <div className="navbar-tools">
        <span className="navbar-status">Admin</span>
        <span aria-label="User profile" className="profile-avatar">A</span>
      </div>
    </header>
  )
}

export default Navbar
