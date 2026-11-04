const express = require("express");

const router = express.Router();

const {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// Add Client
router.post("/", addClient);

// Get All Clients
router.get("/", getClients);

// Get Single Client
router.get("/:id", getClientById);

// Update Client
router.put("/:id", updateClient);

// Delete Client
router.delete("/:id", deleteClient);

module.exports = router;