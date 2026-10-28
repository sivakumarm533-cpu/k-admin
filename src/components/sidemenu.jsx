import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '⌂' },
  { label: 'Products', path: '/products', icon: '▦' },
  { label: 'Categories', path: '/categories', icon: '◫' },
  { label: 'Orders', path: '/orders', icon: '▤' },
  { label: 'Stock Status', path: '/stock-status', icon: '▥' },
  { label: 'Settings', path: '/settings', icon: '⚙' },
]

function SideMenu({ isOpen, onNavigate }) {
  return (
    <aside
      id="admin-sidebar"
      aria-label="Main navigation"
      className={`admin-sidebar${isOpen ? ' is-open' : ''}`}
    >
      <nav>
        <ul className="sidebar-links">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
              >
                <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideMenu
