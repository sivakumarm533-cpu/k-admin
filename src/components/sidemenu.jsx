const menuItems = [
  { label: 'Dashboard', href: '#dashboard', icon: '⌂' },
  { label: 'Products', href: '#products', icon: '▦' },
  { label: 'Categories', href: '#categories', icon: '◫' },
  { label: 'Orders', href: '#orders', icon: '▤' },
  { label: 'Stock Status', href: '#stock-status', icon: '▥' },
  { label: 'Settings', href: '#settings', icon: '⚙' },
]

function SideMenu({ isOpen, onNavigate }) {
  return (
    <aside
      aria-label="Main navigation"
      className={`admin-sidebar${isOpen ? ' is-open' : ''}`}
      id="admin-sidebar"
    >
      <nav>
        <ul className="sidebar-links">
          {menuItems.map((item, index) => (
            <li key={item.label}>
              <a
                aria-current={index === 0 ? 'page' : undefined}
                className={index === 0 ? 'sidebar-link is-active' : 'sidebar-link'}
                href={item.href}
                onClick={onNavigate}
              >
                <span aria-hidden="true" className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideMenu
