
function Navbar({ onMenuClick, onNavigate }) {
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

      <a
        href="/dashboard"
        className="navbar-brand"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/dashboard')
        }}
      >
        ItemPrice Admin
      </a>

      <div className="navbar-tools">
        <span className="navbar-status">Admin</span>
        <span className="profile-avatar" aria-label="User profile">
          A
        </span>
      </div>
    </header>
  );
}

export default Navbar;
