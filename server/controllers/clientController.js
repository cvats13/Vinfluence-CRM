const Client = require("../models/Client");
const { sendWelcomeEmail } = require("../utils/sendWelcomeEmail");

// ==========================
// Add Client + Send Welcome Email
// ==========================
const addClient = async (req, res) => {
  try {
    const {
      companyName,
      ownerName,
      email,
      phone,
      service,
      totalAmount,
      paidAmount,
      dueAmount,
      paymentStatus,
      paymentDate,
      nextDueDate,
      paymentMethod,
      invoiceNumber,
    } = req.body;

    // Check if client already exists
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).json({
        message: "Client already exists",
      });
    }

    // Create and save client
    const newClient = new Client({
      companyName,
      ownerName,
      email,
      phone,
      service,
      totalAmount,
      paidAmount,
      dueAmount,
      paymentStatus,
      paymentDate,
      nextDueDate,
      paymentMethod,
      invoiceNumber,
    });

    await newClient.save();

    // Send welcome email after saving the client
    try {
      await sendWelcomeEmail({
        name: ownerName || companyName,
        email,
        service,
      });

      console.log("Welcome email sent successfully!");
    } catch (emailError) {
      console.error("Welcome email failed:", emailError.message);
    }

    // Respond successfully even if email fails
    return res.status(201).json({
      message: "Client Added Successfully",
      client: newClient,
    });
  } catch (error) {
    console.error("Add client error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Get All Clients
// ==========================
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Get clients error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Get Single Client
// ==========================
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error("Get client error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Update Client
// ==========================
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    return res.status(200).json({
      message: "Client Updated Successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Update client error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Delete Client
// ==========================
const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    return res.status(200).json({
      message: "Client Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete client error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};