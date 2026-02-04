import * as React from 'react';

interface BookingReminderProps {
  bookingNumber: string;
  customerName: string;
  date: string;
  session: string;
  participants: number;
  pickupPoint: string;
  pickupAddress: string;
  pickupTime: string;
  weather?: {
    condition: string;
    temperature: string;
    humidity: string;
    icon: string;
  };
}

export const BookingReminderEmail: React.FC<BookingReminderProps> = ({
  bookingNumber,
  customerName,
  date,
  session,
  participants,
  pickupPoint,
  pickupAddress,
  pickupTime,
  weather,
}) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reminder: Your Adventure is Tomorrow! - Rastasafari Experience</title>
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

          {/* Reminder Header */}
          <tr>
            <td style={styles.reminderHeader}>
              <div style={styles.bellIcon}>&#128276;</div>
              <h2 style={styles.reminderTitle}>Your Adventure is Tomorrow!</h2>
              <p style={styles.reminderSubtitle}>
                Get ready, {customerName}! We can't wait to see you!
              </p>
            </td>
          </tr>

          {/* Countdown */}
          <tr>
            <td style={styles.countdownSection}>
              <p style={styles.countdownText}>&#9200; LESS THAN 24 HOURS TO GO!</p>
            </td>
          </tr>

          {/* Booking Details */}
          <tr>
            <td style={styles.detailsSection}>
              <h3 style={styles.sectionTitle}>Your Booking Details</h3>
              <table style={styles.detailsTable}>
                <tr>
                  <td style={styles.detailLabel}>Booking #:</td>
                  <td style={styles.detailValue}>{bookingNumber}</td>
                </tr>
                <tr>
                  <td style={styles.detailLabel}>Date:</td>
                  <td style={styles.detailValue}>{date}</td>
                </tr>
                <tr>
                  <td style={styles.detailLabel}>Session:</td>
                  <td style={styles.detailValue}>{session}</td>
                </tr>
                <tr>
                  <td style={styles.detailLabel}>Participants:</td>
                  <td style={styles.detailValue}>{participants} {participants === 1 ? 'person' : 'people'}</td>
                </tr>
              </table>
            </td>
          </tr>

          {/* Pickup Information */}
          <tr>
            <td style={styles.pickupSection}>
              <h3 style={styles.sectionTitle}>&#128205; Pickup Information</h3>
              <div style={styles.pickupCard}>
                <p style={styles.pickupTime}>
                  <strong>Be ready at: {pickupTime}</strong>
                </p>
                <p style={styles.pickupPointName}>{pickupPoint}</p>
                <p style={styles.pickupAddress}>{pickupAddress}</p>
                <p style={styles.pickupNote}>
                  &#9888; Please be at the pickup point 10 minutes early
                </p>
              </div>
            </td>
          </tr>

          {/* Weather Section */}
          <tr>
            <td style={styles.weatherSection}>
              <h3 style={styles.sectionTitle}>&#127780; Tomorrow's Weather Forecast</h3>
              <div style={styles.weatherCard}>
                {weather ? (
                  <>
                    <p style={styles.weatherIcon}>{weather.icon}</p>
                    <p style={styles.weatherCondition}>{weather.condition}</p>
                    <table style={styles.weatherDetails}>
                      <tr>
                        <td style={styles.weatherLabel}>Temperature:</td>
                        <td style={styles.weatherValue}>{weather.temperature}</td>
                      </tr>
                      <tr>
                        <td style={styles.weatherLabel}>Humidity:</td>
                        <td style={styles.weatherValue}>{weather.humidity}</td>
                      </tr>
                    </table>
                  </>
                ) : (
                  <>
                    <p style={styles.weatherIcon}>&#127774;</p>
                    <p style={styles.weatherCondition}>Typical Jamaican Weather</p>
                    <p style={styles.weatherNote}>Warm and sunny with possible tropical showers</p>
                    <p style={styles.weatherTemp}>Expected: 28-32°C (82-90°F)</p>
                  </>
                )}
              </div>
            </td>
          </tr>

          {/* Practical Tips */}
          <tr>
            <td style={styles.tipsSection}>
              <h3 style={styles.sectionTitle}>&#128161; Practical Tips for Tomorrow</h3>
              <ul style={styles.tipsList}>
                <li style={styles.tipItem}>
                  <strong>Dress comfortably:</strong> Wear light, breathable clothing and swimwear underneath
                </li>
                <li style={styles.tipItem}>
                  <strong>Protect yourself:</strong> Apply sunscreen before you leave and bring extra
                </li>
                <li style={styles.tipItem}>
                  <strong>Stay hydrated:</strong> We provide water, but bring a reusable bottle
                </li>
                <li style={styles.tipItem}>
                  <strong>Footwear:</strong> Water shoes or sandals with secure straps recommended
                </li>
                <li style={styles.tipItem}>
                  <strong>Valuables:</strong> Leave expensive jewelry at your hotel; bring a waterproof pouch for essentials
                </li>
                <li style={styles.tipItem}>
                  <strong>Camera ready:</strong> Charge your devices and bring waterproof protection
                </li>
                <li style={styles.tipItem}>
                  <strong>Cash:</strong> Bring some Jamaican dollars for tips and souvenirs
                </li>
                <li style={styles.tipItem}>
                  <strong>Eat light:</strong> Have a light breakfast before the tour
                </li>
              </ul>
            </td>
          </tr>

          {/* Don't Forget Checklist */}
          <tr>
            <td style={styles.checklistSection}>
              <h3 style={styles.sectionTitle}>&#9989; Quick Checklist</h3>
              <table style={styles.checklistTable}>
                <tr>
                  <td style={styles.checklistItem}>&#9744; Swimwear</td>
                  <td style={styles.checklistItem}>&#9744; Towel</td>
                </tr>
                <tr>
                  <td style={styles.checklistItem}>&#9744; Sunscreen</td>
                  <td style={styles.checklistItem}>&#9744; Sunglasses</td>
                </tr>
                <tr>
                  <td style={styles.checklistItem}>&#9744; Water shoes</td>
                  <td style={styles.checklistItem}>&#9744; Camera</td>
                </tr>
                <tr>
                  <td style={styles.checklistItem}>&#9744; Cash</td>
                  <td style={styles.checklistItem}>&#9744; Positive vibes!</td>
                </tr>
              </table>
            </td>
          </tr>

          {/* Contact Section */}
          <tr>
            <td style={styles.contactSection}>
              <h3 style={styles.contactTitle}>Need to Reach Us?</h3>
              <p style={styles.contactText}>
                Our team is available to help with any last-minute questions:
              </p>
              <p style={styles.phoneNumber}>
                <span style={styles.phoneIcon}>&#128222;</span>
                <a href="tel:+18764457203" style={styles.phoneLink}>876-445-7203</a>
              </p>
              <p style={styles.contactNote}>
                Available 7 AM - 10 PM Jamaica Time
              </p>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td style={styles.footer}>
              <p style={styles.footerText}>
                &#127796; Get ready for an unforgettable adventure!
              </p>
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
  reminderHeader: {
    textAlign: 'center',
    padding: '30px 20px',
    backgroundColor: '#FFD700',
  },
  bellIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  reminderTitle: {
    color: '#1a1a1a',
    fontSize: '26px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  reminderSubtitle: {
    color: '#333333',
    fontSize: '16px',
    margin: 0,
  },
  countdownSection: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#CE1126',
  },
  countdownText: {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
  },
  detailsSection: {
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
  detailsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  detailLabel: {
    color: '#666666',
    fontSize: '14px',
    padding: '8px 0',
    width: '40%',
  },
  detailValue: {
    color: '#1a1a1a',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '8px 0',
  },
  pickupSection: {
    padding: '25px 30px',
    backgroundColor: '#f8f8f8',
  },
  pickupCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '3px solid #009B3A',
  },
  pickupTime: {
    color: '#CE1126',
    fontSize: '20px',
    margin: '0 0 15px 0',
  },
  pickupPointName: {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  pickupAddress: {
    color: '#666666',
    fontSize: '14px',
    margin: '0 0 15px 0',
    lineHeight: '1.5',
  },
  pickupNote: {
    color: '#CE1126',
    fontSize: '13px',
    margin: 0,
    fontStyle: 'italic',
  },
  weatherSection: {
    padding: '25px 30px',
  },
  weatherCard: {
    backgroundColor: '#e8f5e9',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  weatherIcon: {
    fontSize: '50px',
    margin: '0 0 10px 0',
  },
  weatherCondition: {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  weatherNote: {
    color: '#666666',
    fontSize: '14px',
    margin: '0 0 5px 0',
  },
  weatherTemp: {
    color: '#009B3A',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  weatherDetails: {
    width: 'auto',
    margin: '0 auto',
    borderCollapse: 'collapse',
  },
  weatherLabel: {
    color: '#666666',
    fontSize: '14px',
    padding: '5px 15px 5px 0',
    textAlign: 'right',
  },
  weatherValue: {
    color: '#1a1a1a',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '5px 0',
    textAlign: 'left',
  },
  tipsSection: {
    padding: '25px 30px',
    backgroundColor: '#f8f8f8',
  },
  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  tipItem: {
    color: '#1a1a1a',
    fontSize: '14px',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
    lineHeight: '1.5',
  },
  checklistSection: {
    padding: '25px 30px',
  },
  checklistTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  checklistItem: {
    color: '#1a1a1a',
    fontSize: '14px',
    padding: '10px',
    width: '50%',
    backgroundColor: '#f8f8f8',
    border: '2px solid #ffffff',
  },
  contactSection: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#1a1a1a',
  },
  contactTitle: {
    color: '#FFD700',
    fontSize: '18px',
    margin: '0 0 10px 0',
  },
  contactText: {
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
  contactNote: {
    color: '#999999',
    fontSize: '12px',
    margin: 0,
    fontStyle: 'italic',
  },
  footer: {
    textAlign: 'center',
    padding: '20px 30px',
    backgroundColor: '#2a2a2a',
  },
  footerText: {
    color: '#FFD700',
    fontSize: '14px',
    margin: '0 0 10px 0',
  },
  copyright: {
    color: '#666666',
    fontSize: '11px',
    margin: 0,
  },
};

// HTML string generator for non-React email sending
export function generateBookingReminderHTML(props: BookingReminderProps): string {
  const {
    bookingNumber,
    customerName,
    date,
    session,
    participants,
    pickupPoint,
    pickupAddress,
    pickupTime,
    weather,
  } = props;

  const weatherHTML = weather
    ? `
      <p style="font-size: 50px; margin: 0 0 10px 0;">${weather.icon}</p>
      <p style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">${weather.condition}</p>
      <table style="width: auto; margin: 0 auto; border-collapse: collapse;">
        <tr>
          <td style="color: #666666; font-size: 14px; padding: 5px 15px 5px 0; text-align: right;">Temperature:</td>
          <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 5px 0; text-align: left;">${weather.temperature}</td>
        </tr>
        <tr>
          <td style="color: #666666; font-size: 14px; padding: 5px 15px 5px 0; text-align: right;">Humidity:</td>
          <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 5px 0; text-align: left;">${weather.humidity}</td>
        </tr>
      </table>
    `
    : `
      <p style="font-size: 50px; margin: 0 0 10px 0;">&#127774;</p>
      <p style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">Typical Jamaican Weather</p>
      <p style="color: #666666; font-size: 14px; margin: 0 0 5px 0;">Warm and sunny with possible tropical showers</p>
      <p style="color: #009B3A; font-size: 16px; font-weight: bold; margin: 0;">Expected: 28-32°C (82-90°F)</p>
    `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder: Your Adventure is Tomorrow! - Rastasafari Experience</title>
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

    <!-- Reminder Header -->
    <tr>
      <td style="text-align: center; padding: 30px 20px; background-color: #FFD700;">
        <div style="font-size: 40px; margin-bottom: 10px;">&#128276;</div>
        <h2 style="color: #1a1a1a; font-size: 26px; margin: 10px 0; font-weight: bold;">Your Adventure is Tomorrow!</h2>
        <p style="color: #333333; font-size: 16px; margin: 0;">Get ready, ${customerName}! We can't wait to see you!</p>
      </td>
    </tr>

    <!-- Countdown -->
    <tr>
      <td style="text-align: center; padding: 20px; background-color: #CE1126;">
        <p style="color: #ffffff; font-size: 18px; font-weight: bold; margin: 0; letter-spacing: 1px;">&#9200; LESS THAN 24 HOURS TO GO!</p>
      </td>
    </tr>

    <!-- Booking Details -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">Your Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0; width: 40%;">Booking #:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingNumber}</td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0;">Date:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${date}</td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0;">Session:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${session}</td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 14px; padding: 8px 0;">Participants:</td>
            <td style="color: #1a1a1a; font-size: 14px; font-weight: bold; padding: 8px 0;">${participants} ${participants === 1 ? 'person' : 'people'}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Pickup Information -->
    <tr>
      <td class="content" style="padding: 25px 30px; background-color: #f8f8f8;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">&#128205; Pickup Information</h3>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center; border: 3px solid #009B3A;">
          <p style="color: #CE1126; font-size: 20px; margin: 0 0 15px 0;"><strong>Be ready at: ${pickupTime}</strong></p>
          <p style="color: #1a1a1a; font-size: 18px; font-weight: bold; margin: 0 0 5px 0;">${pickupPoint}</p>
          <p style="color: #666666; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">${pickupAddress}</p>
          <p style="color: #CE1126; font-size: 13px; margin: 0; font-style: italic;">&#9888; Please be at the pickup point 10 minutes early</p>
        </div>
      </td>
    </tr>

    <!-- Weather Section -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">&#127780; Tomorrow's Weather Forecast</h3>
        <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; text-align: center;">
          ${weatherHTML}
        </div>
      </td>
    </tr>

    <!-- Practical Tips -->
    <tr>
      <td class="content" style="padding: 25px 30px; background-color: #f8f8f8;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">&#128161; Practical Tips for Tomorrow</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Dress comfortably:</strong> Wear light, breathable clothing and swimwear underneath</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Protect yourself:</strong> Apply sunscreen before you leave and bring extra</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Stay hydrated:</strong> We provide water, but bring a reusable bottle</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Footwear:</strong> Water shoes or sandals with secure straps recommended</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Valuables:</strong> Leave expensive jewelry at your hotel; bring a waterproof pouch for essentials</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Camera ready:</strong> Charge your devices and bring waterproof protection</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; line-height: 1.5;"><strong>Cash:</strong> Bring some Jamaican dollars for tips and souvenirs</li>
          <li style="color: #1a1a1a; font-size: 14px; padding: 10px 0; line-height: 1.5;"><strong>Eat light:</strong> Have a light breakfast before the tour</li>
        </ul>
      </td>
    </tr>

    <!-- Checklist -->
    <tr>
      <td class="content" style="padding: 25px 30px;">
        <h3 style="color: #009B3A; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">&#9989; Quick Checklist</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Swimwear</td>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Towel</td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Sunscreen</td>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Sunglasses</td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Water shoes</td>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Camera</td>
          </tr>
          <tr>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Cash</td>
            <td style="color: #1a1a1a; font-size: 14px; padding: 10px; width: 50%; background-color: #f8f8f8; border: 2px solid #ffffff;">&#9744; Positive vibes!</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Contact Section -->
    <tr>
      <td style="text-align: center; padding: 30px; background-color: #1a1a1a;">
        <h3 style="color: #FFD700; font-size: 18px; margin: 0 0 10px 0;">Need to Reach Us?</h3>
        <p style="color: #ffffff; font-size: 14px; margin: 0 0 15px 0;">Our team is available to help with any last-minute questions:</p>
        <p style="margin: 0 0 10px 0;">
          <span style="margin-right: 8px;">&#128222;</span>
          <a href="tel:+18764457203" style="color: #FFD700; font-size: 22px; font-weight: bold; text-decoration: none;">876-445-7203</a>
        </p>
        <p style="color: #999999; font-size: 12px; margin: 0; font-style: italic;">Available 7 AM - 10 PM Jamaica Time</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align: center; padding: 20px 30px; background-color: #2a2a2a;">
        <p style="color: #FFD700; font-size: 14px; margin: 0 0 10px 0;">&#127796; Get ready for an unforgettable adventure!</p>
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

export default BookingReminderEmail;
