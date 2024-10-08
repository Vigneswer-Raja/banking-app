const nodemailer = require('nodemailer');

// Create the transporter using your email service (Gmail in this case)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can also use other services like Outlook, Yahoo, etc.
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password',  // Your email password or app password (if using Gmail)
  },
});

// Function to send email
const sendAccountApprovalEmail = async (customerEmail, customerName) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender's email address
    to: customerEmail, // Recipient's email address
    subject: 'Account Approved', // Subject of the email
    html: `<h3>Hello ${customerName},</h3>
           <p>Your account has been approved! You can now log in to our platform.</p>
           <p>Thanks,<br/>Bank Team</p>`, // HTML content of the email
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
};

module.exports = { sendAccountApprovalEmail };
