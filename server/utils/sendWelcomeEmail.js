const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test Gmail connection
async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log("Gmail connected successfully!");
    return true;
  } catch (error) {
    console.error("Gmail connection failed:", error.message);
    return false;
  }
}

// Send welcome email to a new client
async function sendWelcomeEmail(client) {
  if (!client.email) {
    throw new Error("Client email address is missing");
  }

  const mailOptions = {
    from: `"Vinfluence Media" <${process.env.EMAIL_USER}>`,
    to: client.email,
    subject: "Welcome to Vinfluence Media!",
    text: `Hello ${client.name || "Valued Client"},

Welcome to Vinfluence Media!

Thank you for choosing our services: ${
      Array.isArray(client.service)
        ? client.service.join(", ")
        : client.service || "Digital Marketing Services"
    }.

We look forward to working with you!

Best regards,
Vinfluence Media`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendWelcomeEmail,
  testEmailConnection,
};