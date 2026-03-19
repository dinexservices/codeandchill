import transporter from "../config/email.js";

const formatFieldLabel = (key) => {
  const map = {
    name: "Name", email: "Email", phone: "Phone",
    college: "College", registrationNumber: "Reg No.",
    year: "Year", department: "Department"
  };
  return map[key] || key;
};

const sendRegistrationEmail = async ({
  to,
  participantName,
  eventTitle,
  totalTickets,
  amount,
  teamName,
  participants = []
}) => {

  // Generate participant details rows
  const participantHTML = participants.map((p, index) => {
    // Filter out standard info fields to display cleanly
    const fields = Object.entries(p).filter(([k, v]) => 
      v && typeof v === 'string' && v.trim() !== '' && !['_id'].includes(k)
    );

    return `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #eef0f2; padding-bottom: 15px;">
        <h4 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 15px;">
          <span style="background: #2563eb; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-block; text-align: center; line-height: 20px; font-size: 12px; margin-right: 8px;">${index + 1}</span>
          ${p.name || `Participant ${index + 1}`}
        </h4>
        <div style="padding-left: 28px;">
          ${fields.map(([k, v]) => `
            <div style="margin-bottom: 4px; font-size: 13px;">
              <span style="color: #666; width: 90px; display: inline-block;">${formatFieldLabel(k)}:</span>
              <strong style="color: #1a1a1a;">${v}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');


  const mailOptions = {
    from: {
      name: "CodeNchill",
      address: "codenchil@conclavetechmedia.com",
    },
    to,
    subject: `Registration Confirmed – ${eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
                
                <!-- Header with Logo -->
                <tr>
                  <td align="center" style="background-color: #0c0c0c; padding: 25px;">
                    <img src="https://www.codenchill.tech/logo.png" alt="CodeNchill" style="height: 40px; display: block; border: 0;">
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 20px 0; font-weight: 700; text-align: center;">You're In! 🎟️</h1>
                    
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Hi <strong>${participantName}</strong>,</p>
                    
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                      Great news! Your registration for <strong>${eventTitle}</strong> has been successfully confirmed. ${teamName ? `Your team <strong>${teamName}</strong> is ready to go.` : ''} We're excited to have you join us.
                    </p>

                    <!-- Ticket Overview Box -->
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border: 1px solid #eef0f2; border-radius: 8px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-bottom: 10px; border-bottom: 1px solid #eef0f2;">
                                <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Event</p>
                                <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${eventTitle}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 15px 0; border-bottom: 1px solid #eef0f2;">
                                <div style="display: flex; justify-content: space-between;">
                                  <div>
                                    <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Participants</p>
                                    <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${totalTickets}</p>
                                  </div>
                                  ${teamName ? `
                                  <div style="text-align: right;">
                                    <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Team Name</p>
                                    <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${teamName}</p>
                                  </div>` : ''}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 15px;">
                                <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">Total Paid</p>
                                <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: 700; color: #2563eb;">${amount === 0 ? 'Free' : `₹${amount}`}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Participant Details Section -->
                    <div style="margin-bottom: 30px;">
                      <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #eef0f2;">Registration Details</h3>
                      ${participantHTML}
                    </div>

                    <!-- Additional Info -->
                    <div style="background-color: #fff8eb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
                      <p style="margin: 0; color: #92400e; font-size: 14px;">
                        <strong>📍 Note:</strong> Specific venue details and schedule updates will be sent to your email shortly. Keep an eye out!
                      </p>
                    </div>

                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0;">
                      Please keep this email for your records as proof of registration.
                    </p>
                    
                    <div style="margin-top: 40px; border-top: 1px solid #eef0f2; padding-top: 25px;">
                      <p style="margin: 0; color: #1a1a1a; font-weight: 600;">The CodeNchill Team</p>
                      <p style="margin: 5px 0 0 0; color: #888888; font-size: 12px;">Building cool stuff, together.</p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="background-color: #f8f9fa; padding: 20px; border-top: 1px solid #eef0f2;">
                    <p style="margin: 0; color: #888888; font-size: 12px; line-height: 1.5;">
                      &copy; ${new Date().getFullYear()} CodeNchill. All rights reserved.<br>
                      <a href="https://codenchil.tech" style="color: #2563eb; text-decoration: none;">Visit our Website</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendRegistrationEmail;