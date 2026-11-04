require("dotenv").config();

const { testEmailConnection } = require("./utils/sendWelcomeEmail");

async function main() {
  const connected = await testEmailConnection();

  if (connected) {
    console.log("Your Gmail SMTP setup is working.");
  } else {
    console.log("Check your Gmail address and Google App Password.");
  }
}

main();