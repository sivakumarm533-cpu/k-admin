
const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Products", path: "/products", icon: "▦" },
  { label: "Categories", path: "/categories", icon: "◫" },
  { label: "Orders", path: "/orders", icon: "▤" },
  { label: "Stock Status", path: "/stock-status", icon: "▥" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];

function SideMenu({ currentPath, isOpen, onNavigate }) {
  return (
    <aside
      id="admin-sidebar"
      aria-label="Main navigation"
      className={`admin-sidebar ${isOpen ? "is-open" : ""}`}
    >
      <nav>
        <ul className="sidebar-links">
          {menuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(item.path)
                }}
                aria-current={currentPath === item.path ? 'page' : undefined}
                className={`sidebar-link ${currentPath === item.path ? 'is-active' : ''}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideMenu;
