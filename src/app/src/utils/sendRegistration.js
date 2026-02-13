import transporter from "../config/email.js";

const sendRegistrationEmail = async ({
  to,
  participantName,
  eventTitle,
  ticketNumber,
  totalTickets,
  amount
}) => {
  const mailOptions = {
    from: `"Event Team" <${process.env.MAIL_ADMINISTRATOR}>`,
    to,
    subject: `🎟️ Registration Confirmed – ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hi ${participantName},</h2>
        <p>Your registration for <strong>${eventTitle}</strong> is confirmed.</p>

        <p><strong>Ticket:</strong> ${ticketNumber} of ${totalTickets}</p>
        <p><strong>Amount Paid:</strong> ₹${amount}</p>

        <hr/>

        <p>📍 Event details will be shared soon.</p>
        <p>📧 Keep this email for future reference.</p>

        <br/>
        <p>Regards,<br/>Event Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendRegistrationEmail;
