const express = require("express");

const router = express.Router();

const {
  addPayment,
  getPayments,
  deletePayment,
} = require("../controllers/paymentController");

// Add Payment
router.post("/", addPayment);

// Get All Payments of One Client
router.get("/:clientId", getPayments);

// Delete Payment
router.delete("/:id", deletePayment);

module.exports = router;