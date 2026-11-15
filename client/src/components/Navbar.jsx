
import "./Nacbar.css";

function Navbar() {
  const toggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-crm-sidebar"));
  };

  return (
    <nav className="crm-navbar">
      <div className="crm-navbar-left">
        <button
          className="crm-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h2>Vinfluence CRM</h2>
      </div>

      <h3>Welcome Vineet</h3>
    </nav>
  );
}

export default Navbar;
