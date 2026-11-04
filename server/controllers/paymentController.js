const Payment = require("../models/Payment");
const Client = require("../models/Client");

// ==========================
// Add Payment
// ==========================
const addPayment = async (req, res) => {
  try {
    const {
      clientId,
      amount,
      paymentMethod,
      paymentDate,
      remarks,
    } = req.body;

    const payment = new Payment({
      clientId,
      amount,
      paymentMethod,
      paymentDate,
      remarks,
    });

    await payment.save();

    const client = await Client.findById(clientId);

    if (client) {
      client.paidAmount =
        Number(client.paidAmount || 0) + Number(amount);

      client.dueAmount =
        Number(client.totalAmount || 0) -
        Number(client.paidAmount);

      if (client.dueAmount <= 0) {
        client.paymentStatus = "Paid";
        client.dueAmount = 0;
      } else {
        client.paymentStatus = "Partial";
      }

      await client.save();
    }

    res.status(201).json({
      message: "Payment Added Successfully",
      payment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================
// Get Payments By Client
// ==========================
const getPayments = async (req, res) => {
  try {

    const payments = await Payment.find({
      clientId: req.params.clientId,
    }).sort({ paymentDate: -1 });

    res.status(200).json(payments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================
// Delete Payment
// ==========================
const deletePayment = async (req, res) => {
  try {

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment Not Found",
      });
    }

    const client = await Client.findById(payment.clientId);

    if (client) {
      client.paidAmount =
        Number(client.paidAmount) - Number(payment.amount);

      client.dueAmount =
        Number(client.totalAmount) -
        Number(client.paidAmount);

      if (client.paidAmount <= 0) {
        client.paymentStatus = "Pending";
      }

      await client.save();
    }

    await Payment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Payment Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  addPayment,
  getPayments,
  deletePayment,
};