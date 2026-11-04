import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>Menu</h2>

      <hr />

      <br />

      <Link
        to="/dashboard"
        style={{ color: "white", textDecoration: "none" }}
      >
        Dashboard
      </Link>

      <br />
      <br />

      <Link
        to="/clients"
        style={{ color: "white", textDecoration: "none" }}
      >
        Clients
      </Link>

      <br />
      <br />

      <Link
        to="/add-client"
        style={{ color: "white", textDecoration: "none" }}
      >
        Add Client
      </Link>

      <br />
      <br />

      <Link
        to="/"
        style={{ color: "white", textDecoration: "none" }}
      >
        Logout
      </Link>

    </div>
  );
}

export default Sidebar;