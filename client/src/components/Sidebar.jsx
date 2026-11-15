
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleMenu = () => {
      setIsOpen((previous) => !previous);
    };

    window.addEventListener("toggle-crm-sidebar", toggleMenu);

    return () => {
      window.removeEventListener("toggle-crm-sidebar", toggleMenu);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="crm-sidebar-backdrop"
          onClick={closeMenu}
        />
      )}

      <aside className={`crm-sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="crm-sidebar-title">Menu</h2>

        <hr />

        <nav className="crm-sidebar-nav">
          <NavLink to="/dashboard" onClick={closeMenu}>
            Dashboard
          </NavLink>

          <NavLink to="/clients" onClick={closeMenu}>
            Clients
          </NavLink>

          <NavLink to="/add-client" onClick={closeMenu}>
            Add Client
          </NavLink>

          <button
            type="button"
            className="crm-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
