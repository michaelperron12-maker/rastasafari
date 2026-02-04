import * as React from 'react';

interface ContactReceivedProps {
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  ticketNumber?: string;
  estimatedResponseTime?: string;
}

export const ContactReceivedEmail: React.FC<ContactReceivedProps> = ({
  customerName,
  customerEmail,
  subject,
  message,
  ticketNumber,
  estimatedResponseTime = '24-48 hours',
}) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>We Received Your Message - Rastasafari Experience</title>
      </head>
      <body style={styles.body}>
        <table style={styles.container}>
          {/* Header with Rasta colors */}
          <tr><td style={styles.rastaStripeGreen}></td></tr>
          <tr><td style={styles.rastaStripeYellow}></td></tr>
          <tr><td style={styles.rastaStripeRed}></td></tr>

          {/* Logo Section */}
          <tr>
            <td style={styles.logoSection}>
              <img
                src="https://rastasafari.com/logo.png"
                alt="Rastasafari Experience"
                style={styles.logo}
              />
              <h1 style={styles.brandName}>RASTASAFARI EXPERIENCE</h1>
            </td>
          </tr>

          {/* Confirmation Header */}
          <tr>
            <td style={styles.confirmationHeader}>
              <div style={styles.envelopeIcon}>&#9993;</div>
              <h2 style={styles.confirmationTitle}>Message Received!</h2>
              <p style={styles.confirmationSubtitle}>
                Thank you for reaching out, {customerName}!
              </p>
            </td>
          </tr>

          {/* Ticket Number (if provided) */}
          {ticketNumber && (
            <tr>
              <td style={styles.ticketSection}>
                <p style={styles.ticketLabel}>REFERENCE NUMBER</p>
                <p style={styles.ticketNumber}>{ticketNumber}</p>
              </td>
            </tr>
          )}

          {/* Message Content */}
          <tr>
            <td style={styles.messageSection}>
              <h3 style={styles.sectionTitle}>Your Message</h3>
              <div style={styles.messageCard}>
                <p style={styles.messageSubject}>
                  <strong>Subject:</strong> {subject}
                </p>
                <div style={styles.messageDivider}></div>
                <p style={styles.messageContent}>{message}</p>
              </div>
            </td>
          </tr>

          {/* Response Time */}
          <tr>
            <td style={styles.responseSection}>
              <h3 style={styles.sectionTitle}>What Happens Next?</h3>
              <div style={styles.timelineContainer}>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineIcon}>1</div>
                  <div style={styles.timelineContent}>
                    <p style={styles.timelineTitle}>Message Received</p>
                    <p style={styles.timelineDesc}>Your message is now in our inbox</p>
                  </div>
                </div>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineIcon}>2</div>
                  <div style={styles.timelineContent}>
                    <p style={styles.timelineTitle}>Under Review</p>
                    <p style={styles.timelineDesc}>Our team will review your inquiry</p>
                  </div>
                </div>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineIconActive}>3</div>
                  <div style={styles.timelineContent}>
                    <p style={styles.timelineTitle}>Response Coming</p>
                    <p style={styles.timelineDesc}>
                      Estimated response time: <strong>{estimatedResponseTime}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          {/* FAQ Section */}
          <tr>
            <td style={styles.faqSection}>
              <h3 style={styles.sectionTitle}>While You Wait...</h3>
              <p style={styles.faqText}>
                Check out our frequently asked questions - your answer might be there!
              </p>
              <a href="https://rastasafari.com/faq" style={styles.faqButton}>
                Visit Our FAQ
              </a>
            </td>
          </tr>

          {/* Urgent Contact */}
          <tr>
            <td style={styles.urgentSection}>
              <h3 style={styles.urgentTitle}>Need Urgent Help?</h3>
              <p style={styles.urgentText}>
                For time-sensitive matters or existing booking changes, call us directly:
              </p>
              <p style={styles.phoneNumber}>
                <span style={styles.phoneIcon}>&#128222;</span>
                <a href="tel:+18764457203" style={styles.phoneLink}>876-445-7203</a>
              </p>
              <p style={styles.hoursText}>
                Available 7 AM - 10 PM Jamaica Time, 7 days a week
              </p>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td style={styles.footer}>
              <p style={styles.footerText}>
                One Love from the Rastasafari Team!
              </p>
              <div style={styles.socialLinks}>
                <a href="https://facebook.com/rastasafari" style={styles.socialLink}>Facebook</a>
                <span style={styles.socialDivider}>|</span>
                <a href="https://instagram.com/rastasafari" style={styles.socialLink}>Instagram</a>
                <span style={styles.socialDivider}>|</span>
                <a href="https://rastasafari.com" style={styles.socialLink}>Website</a>
              </div>
              <p style={styles.copyright}>
                &copy; {new Date().getFullYear()} Rastasafari Experience. All rights reserved.
              </p>
            </td>
          </tr>

          {/* Bottom Rasta colors */}
          <tr><td style={styles.rastaStripeRed}></td></tr>
          <tr><td style={styles.rastaStripeYellow}></td></tr>
          <tr><td style={styles.rastaStripeGreen}></td></tr>
        </table>
      </body>
    </html>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f4f4f4',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    width: '100%',
  },
  rastaStripeGreen: {
    backgroundColor: '#009B3A',
    height: '8px',
  },
  rastaStripeYellow: {
    backgroundColor: '#FFD700',
    height: '8px',
  },
  rastaStripeRed: {
    backgroundColor: '#CE1126',
    height: '8px',
  },
  logoSection: {
    textAlign: 'center',
    padding: '25px 20px 15px',
    backgroundColor: '#1a1a1a',
  },
  logo: {
    width: '100px',
    height: 'auto',
    marginBottom: '10px',
  },
  brandName: {
    color: '#FFD700',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '2px',
  },
  confirmationHeader: {
    textAlign: 'center',
    padding: '30px 20px',
    backgroundColor: '#009B3A',
  },
  envelopeIcon: {
    fontSize: '50px',
    marginBottom: '10px',
    color: '#ffffff',
  },
  confirmationTitle: {
    color: '#ffffff',
    fontSize: '26px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  confirmationSubtitle: {
    color: '#ffffff',
    fontSize: '16px',
    margin: 0,
  },
  ticketSection: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #e0e0e0',
  },
  ticketLabel: {
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '1px',
    margin: '0 0 5px 0',
  },
  ticketNumber: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    margin: 0,
    letterSpacing: '2px',
  },
  messageSection: {
    padding: '25px 30px',
  },
  sectionTitle: {
    color: '#009B3A',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    borderBottom: '2px solid #FFD700',
    paddingBottom: '10px',
  },
  messageCard: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #FFD700',
  },
  messageSubject: {
    color: '#1a1a1a',
    fontSize: '14px',
    margin: '0 0 10px 0',
  },
  messageDivider: {
    borderBottom: '1px solid #e0e0e0',
    margin: '10px 0',
  },
  messageContent: {
    color: '#666666',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  },
  responseSection: {
    padding: '25px 30px',
    backgroundColor: '#f8f8f8',
  },
  timelineContainer: {
    padding: '10px 0',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '20px',
  },
  timelineIcon: {
    width: '30px',
    height: '30px',
    backgroundColor: '#009B3A',
    color: '#ffffff',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '15px',
    flexShrink: 0,
  },
  timelineIconActive: {
    width: '30px',
    height: '30px',
    backgroundColor: '#FFD700',
    color: '#1a1a1a',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '15px',
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    color: '#1a1a1a',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 3px 0',
  },
  timelineDesc: {
    color: '#666666',
    fontSize: '13px',
    margin: 0,
  },
  faqSection: {
    textAlign: 'center',
    padding: '30px',
  },
  faqText: {
    color: '#666666',
    fontSize: '14px',
    margin: '0 0 20px 0',
  },
  faqButton: {
    display: 'inline-block',
    backgroundColor: '#009B3A',
    color: '#ffffff',
    padding: '12px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  urgentSection: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#1a1a1a',
  },
  urgentTitle: {
    color: '#FFD700',
    fontSize: '18px',
    margin: '0 0 10px 0',
  },
  urgentText: {
    color: '#ffffff',
    fontSize: '14px',
    margin: '0 0 15px 0',
  },
  phoneNumber: {
    margin: '0 0 10px 0',
  },
  phoneIcon: {
    marginRight: '8px',
  },
  phoneLink: {
    color: '#FFD700',
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  hoursText: {
    color: '#999999',
    fontSize: '12px',
    margin: 0,
    fontStyle: 'italic',
  },
  footer: {
    textAlign: 'center',
    padding: '25px 30px',
    backgroundColor: '#2a2a2a',
  },
  footerText: {
    color: '#FFD700',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    fontStyle: 'italic',
  },
  socialLinks: {
    marginBottom: '15px',
  },
  socialLink: {
    color: '#ffffff',
    fontSize: '12px',
    textDecoration: 'none',
    padding: '0 10px',
  },
  socialDivider: {
    color: '#666666',
  },
  copyright: {
    color: '#666666',
    fontSize: '11px',
    margin: 0,
  },
};

// HTML string generator for non-React email sending
export function generateContactReceivedHTML(props: ContactReceivedProps): string {
  const {
    customerName,
    subject,
    message,
    ticketNumber,
    estimatedResponseTime = '24-48 hours',
  } = props;

  const ticketHTML = ticketNumber
    ? `
      <tr>
        <td style="text-align: center; padding: 20px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
          <p style="color: #666666; font-size: 12px; letter-spacing: 1px; margin: 0 0 5px 0;">REFERENCE NUMBER</p>
          <p style="color: #1a1a1a; font-size: 24px; font-weight: bold; font-family: monospace; margin: 0; letter-spacing: 2px;">${ticketNumber}</p>
        </td>
      </tr>
    `
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Message - Rastasafari Experience</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 15px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse; width: 100%;">
    <!-- Rasta Colors Top -->
    <tr><td style="background-color: #009B3A; height: 8px;"></td></tr>
    <tr><td style="background-color: #FFD700; height: 8px;"></td></tr>
    <tr><td style="background-color: #CE1126; height: 8px;"></td></tr>

    <!-- Logo Section -->
    <tr>
      <td style="text-align: center; padding: 25px 20px 15px; background-color: #1a1a1a;">
        <img src="https://rastasafari.com/logo.png" alt="Rastasafari Experience" style="width: 100px; height: auto; margin-bottom: 10px;">
        <h1 style="color: #FFD700; font-size: 20px; font-weight: bold; margin: 0; letter-spacing: 2px;">RASTASAFARI EXPERIENCE</h1>
      </td>
    </tr>

    <!-- Confirmation Header -->
    <tr>
      <td style="text-align: center; padding: 30px 20px; background-color: #009B3A;">
        <div style="font-size: 50px; margin-bottom: 10px; color: #ffffff;">&#9993;</div>
        <h2 style="color: #ffffff; font-size: 26px; margin: 10px 0; font-weight: bold;">Message Received!</h2>
        <p style="color: #ffffff; font-size: 16px; margin: 0;">Thank you for reaching out, ${customerName}!</p>
      </td>
    </tr>

    <!-- Ticket Number -->
    ${ticketHTML}

    <!-- Message Content -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Your Message</h3>
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700;">
          <p style="color: #1a1a1a; font-size: 14px; margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="border-bottom: 1px solid #e0e0e0; margin: 10px 0;"></div>
          <p style="color: #666666; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </td>
    </tr>

    <!-- Response Time -->
    <tr>
      <td class="content" style="padding: 25px 30px; background-color: #f8f8f8;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">What Happens Next?</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; vertical-align: top; width: 50px;">
              <div style="width: 30px; height: 30px; background-color: #009B3A; color: #ffffff; border-radius: 50%; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">1</div>
            </td>
            <td style="padding: 10px 0; vertical-align: top;">
              <p style="color: #1a1a1a; font-size: 14px; font-weight: bold; margin: 0 0 3px 0;">Message Received</p>
              <p style="color: #666666; font-size: 13px; margin: 0;">Your message is now in our inbox</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top; width: 50px;">
              <div style="width: 30px; height: 30px; background-color: #009B3A; color: #ffffff; border-radius: 50%; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">2</div>
            </td>
            <td style="padding: 10px 0; vertical-align: top;">
              <p style="color: #1a1a1a; font-size: 14px; font-weight: bold; margin: 0 0 3px 0;">Under Review</p>
              <p style="color: #666666; font-size: 13px; margin: 0;">Our team will review your inquiry</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top; width: 50px;">
              <div style="width: 30px; height: 30px; background-color: #FFD700; color: #1a1a1a; border-radius: 50%; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">3</div>
            </td>
            <td style="padding: 10px 0; vertical-align: top;">
              <p style="color: #1a1a1a; font-size: 14px; font-weight: bold; margin: 0 0 3px 0;">Response Coming</p>
              <p style="color: #666666; font-size: 13px; margin: 0;">Estimated response time: <strong>${estimatedResponseTime}</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FAQ Section -->
    <tr>
      <td style="text-align: center; padding: 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px; display: inline-block;">While You Wait...</h3>
        <p style="color: #666666; font-size: 14px; margin: 0 0 20px 0;">Check out our frequently asked questions - your answer might be there!</p>
        <a href="https://rastasafari.com/faq" style="display: inline-block; background-color: #009B3A; color: #ffffff; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 14px;">Visit Our FAQ</a>
      </td>
    </tr>

    <!-- Urgent Contact -->
    <tr>
      <td style="text-align: center; padding: 30px; background-color: #1a1a1a;">
        <h3 style="color: #FFD700; font-size: 18px; margin: 0 0 10px 0;">Need Urgent Help?</h3>
        <p style="color: #ffffff; font-size: 14px; margin: 0 0 15px 0;">For time-sensitive matters or existing booking changes, call us directly:</p>
        <p style="margin: 0 0 10px 0;">
          <span style="margin-right: 8px;">&#128222;</span>
          <a href="tel:+18764457203" style="color: #FFD700; font-size: 22px; font-weight: bold; text-decoration: none;">876-445-7203</a>
        </p>
        <p style="color: #999999; font-size: 12px; margin: 0; font-style: italic;">Available 7 AM - 10 PM Jamaica Time, 7 days a week</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align: center; padding: 25px 30px; background-color: #2a2a2a;">
        <p style="color: #FFD700; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; font-style: italic;">One Love from the Rastasafari Team!</p>
        <div style="margin-bottom: 15px;">
          <a href="https://facebook.com/rastasafari" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Facebook</a>
          <span style="color: #666666;">|</span>
          <a href="https://instagram.com/rastasafari" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Instagram</a>
          <span style="color: #666666;">|</span>
          <a href="https://rastasafari.com" style="color: #ffffff; font-size: 12px; text-decoration: none; padding: 0 10px;">Website</a>
        </div>
        <p style="color: #666666; font-size: 11px; margin: 0;">&copy; ${new Date().getFullYear()} Rastasafari Experience. All rights reserved.</p>
      </td>
    </tr>

    <!-- Rasta Colors Bottom -->
    <tr><td style="background-color: #CE1126; height: 8px;"></td></tr>
    <tr><td style="background-color: #FFD700; height: 8px;"></td></tr>
    <tr><td style="background-color: #009B3A; height: 8px;"></td></tr>
  </table>
</body>
</html>
  `;
}

export default ContactReceivedEmail;
