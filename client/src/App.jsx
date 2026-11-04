import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";
import ClientMaterials from "./pages/ClientMaterials";
import ClientDetails from "./pages/ClientDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/clients" element={<Clients />} />

        <Route path="/add-client" element={<AddClient />} />

        <Route path="/edit-client/:id" element={<EditClient />} />

        <Route
          path="/client-materials/:id"
          element={<ClientMaterials />}
        />

        <Route
          path="/client/:id"
          element={<ClientDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;