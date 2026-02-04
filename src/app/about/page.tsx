'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface TeamMember {
  name: string;
  role: string;
  description: string;
}

// Data
const teamMembers: TeamMember[] = [
  {
    name: 'Ras Asaph',
    role: 'Founder & Lead Guide',
    description: 'Born and raised in Roaring River, Ras Asaph has been sharing Rastafari wisdom for over 20 years.',
  },
  {
    name: 'Sister Marcia',
    role: 'Ital Chef',
    description: 'Master of Ital cuisine, she prepares traditional meals with herbs from the garden.',
  },
  {
    name: 'Brother Kwame',
    role: 'Nature Guide & Herbalist',
    description: 'Expert in medicinal plants and guide for the natural trails of Roaring River.',
  },
  {
    name: 'Sister Imani',
    role: 'Experience Coordinator',
    description: 'She ensures every visitor lives an authentic and memorable experience.',
  },
];

const timelineEvents = [
  { year: '1930s', title: 'Birth of the Movement', description: 'Rastafarianism emerges in Jamaica after the coronation of Haile Selassie.' },
  { year: '1960s', title: 'Roaring River Community', description: 'The first Rastas settle in the peaceful village of Roaring River.' },
  { year: '1990s', title: 'Opening to Visitors', description: 'The community begins welcoming visitors to share their culture.' },
  { year: '2010', title: 'Rastasafari Experience', description: 'Official creation of the authentic tourist experience.' },
  { year: 'Today', title: 'Mission Continues', description: 'Over 10,000 visitors have discovered true Rastafari culture.' },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <Image
          src="/images/rastasafari/banner.jpg"
          alt="Rastasafari Experience Jamaica"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-content">
          <span className="hero-badge">Our Story</span>
          <h1>Welcome to Roaring River</h1>
          <p className="hero-subtitle">
            In the heart of Westmoreland Parish, an authentic community opens its doors
            to share real Rastafari culture
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Residents</span>
            </div>
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Years of History</span>
            </div>
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Visitors Welcomed</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Discover</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-stack">
              <div className="story-image primary">
                <Image
                  src="/images/rastasafari/village-rasta.jpg"
                  alt="Aerial view of the village"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                />
              </div>
              <div className="story-image secondary">
                <Image
                  src="/images/rastasafari/nature.jpg"
                  alt="Community life"
                  width={300}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <div className="story-badge">
                <span className="badge-text">Since 1960</span>
              </div>
            </div>
            <div className="story-content">
              <span className="section-tag">Our Story</span>
              <h2>The Village of Roaring River</h2>
              <p className="lead">
                Nestled in the lush hills of Westmoreland Parish, our village
                has been a sanctuary of peace and spirituality for over 60 years.
              </p>
              <p>
                Founded by Rastafaris seeking a life in harmony with nature,
                Roaring River has become a living symbol of authentic Rastafari culture.
                Our community of 500 residents perpetuates ancestral traditions while
                welcoming those who wish to discover our way of life.
              </p>
              <p>
                <strong>Our mission</strong>: to share real Rastafari culture,
                beyond stereotypes, to create bridges between peoples and
                promote the values of love, peace, and unity.
              </p>
              <div className="story-features">
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span>Preserved Authenticity</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span>United Community</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span>Living Heritage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rastafari Culture */}
      <section className="culture-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">Understand</span>
            <h2>Rastafari Culture</h2>
            <p>More than a religion, a way of life in harmony with nature and humanity</p>
          </div>

          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>History of the Movement</h3>
              <p>
                Born in 1930s Jamaica, Rastafarianism emerged as a spiritual
                and social movement after the coronation of Haile Selassie I of Ethiopia.
                It represents hope, resistance, and return to African roots.
              </p>
              <ul className="culture-list">
                <li>Origin: Jamaica, 1930s</li>
                <li>Founders: Marcus Garvey, Leonard Howell</li>
                <li>Symbol: Lion of Judah</li>
              </ul>
            </div>

            <div className="culture-card">
              <div className="culture-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Beliefs & Philosophy</h3>
              <p>
                Rastafaris believe in one God, Jah, and see Haile Selassie
                as his earthly manifestation. The philosophy promotes universal love,
                peace, and respect for all forms of life.
              </p>
              <ul className="culture-list">
                <li>One Love: Universal love</li>
                <li>Inity: Unity of humanity</li>
                <li>I and I: Divine connection</li>
              </ul>
            </div>

            <div className="culture-card">
              <div className="culture-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22c4.97 0 9-2.69 9-6V8c0-3.31-4.03-6-9-6S3 4.69 3 8v8c0 3.31 4.03 6 9 6z" />
                  <path d="M12 10c2.76 0 5-1.12 5-2.5S14.76 5 12 5 7 6.12 7 7.5 9.24 10 12 10z" />
                  <path d="M7 7.5v4c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5v-4" />
                  <path d="M7 11.5v4c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5v-4" />
                </svg>
              </div>
              <h3>Ital Lifestyle</h3>
              <p>
                Ital food is at the heart of the Rastafari way of life. Pure, natural,
                and vegan, it nourishes body and spirit. Each meal is prepared
                with intention and gratitude.
              </p>
              <ul className="culture-list">
                <li>Natural and pure food</li>
                <li>No chemicals</li>
                <li>Plant-based cuisine</li>
              </ul>
            </div>

            <div className="culture-card">
              <div className="culture-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a10 10 0 0 0-6.88 17.31l1.42-1.42A8 8 0 1 1 12 20a7.93 7.93 0 0 1-4.95-1.72l-1.42 1.42A10 10 0 1 0 12 2z" />
                  <path d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </div>
              <h3>Importance of Nature</h3>
              <p>
                Nature is sacred for Rastafaris. Every plant, every river,
                every mountain is a manifestation of Jah. Living in harmony with
                Mother Earth is a fundamental principle.
              </p>
              <ul className="culture-list">
                <li>Environmental respect</li>
                <li>Medicinal herbs</li>
                <li>Sustainable agriculture</li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-section">
            <h3>Our Journey</h3>
            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <span className="timeline-year">{event.year}</span>
                  </div>
                  <div className="timeline-content">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Meet</span>
            <h2>Our Team</h2>
            <p>Passionate and authentic guides, born and raised in our community</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <Image
                    src={`/images/rastasafari/experience-${(index % 2) + 1}.jpg`}
                    alt={member.name}
                    width={300}
                    height={280}
                    className="object-cover w-full h-full"
                  />
                  <div className="team-overlay">
                    <span>Learn more</span>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="team-note">
            <div className="note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </div>
            <div className="note-content">
              <h4>Certified Guides</h4>
              <p>
                All our guides are certified by the Jamaica Tourist Board and trained
                to offer a safe and enriching experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="commitment-section">
        <div className="container">
          <div className="commitment-grid">
            <div className="commitment-content">
              <span className="section-tag">Our Values</span>
              <h2>Our Commitment</h2>
              <p className="lead">
                We believe responsible tourism can transform lives
                and preserve cultures for future generations.
              </p>

              <div className="commitment-cards">
                <div className="commitment-card">
                  <div className="commitment-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <h4>Responsible Tourism</h4>
                    <p>
                      We minimize our environmental impact and maximize
                      benefits for the local community.
                    </p>
                  </div>
                </div>

                <div className="commitment-card">
                  <div className="commitment-icon gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h4>Local Community</h4>
                    <p>
                      100% of our guides come from the village. Every visit
                      directly supports local families.
                    </p>
                  </div>
                </div>

                <div className="commitment-card">
                  <div className="commitment-icon red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Guaranteed Authenticity</h4>
                    <p>
                      No staging, no show. You live our daily life
                      as it really is.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="commitment-visual">
              <div className="visual-card">
                <Image
                  src="/images/rastasafari/safari-tour.jpg"
                  alt="Sustainable living"
                  width={500}
                  height={600}
                  className="rounded-2xl"
                />
                <div className="visual-overlay">
                  <span className="visual-stat">100%</span>
                  <span className="visual-label">Local Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="recognition-section">
        <div className="container">
          <div className="recognition-header">
            <span className="section-tag">Recognition</span>
            <h2>What Our Visitors Say</h2>
          </div>

          <div className="recognition-grid">
            <div className="recognition-main">
              <div className="tripadvisor-badge">
                <div className="badge-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1%</text>
                  </svg>
                </div>
                <div className="badge-content">
                  <span className="badge-title">Top 1%</span>
                  <span className="badge-subtitle">of worldwide attractions on TripAdvisor</span>
                </div>
              </div>

              <div className="stats-row">
                <div className="stat-card">
                  <span className="stat-number">2,142+</span>
                  <span className="stat-label">Verified Reviews</span>
                  <div className="stat-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-number">9.8/10</span>
                  <span className="stat-label">Average Rating</span>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Recommend</span>
                  <div className="stat-thumbs">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-highlight">
              <blockquote>
                <p>
                  &quot;An experience that changed my view of the world. The authenticity,
                  warmth, and shared wisdom will stay with me forever.&quot;
                </p>
                <footer>
                  <cite>- Sarah M., United States</cite>
                  <span className="testimonial-date">January 2024</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">Gallery</span>
            <h2>Discover Our Village</h2>
            <p>Authentic moments captured in the heart of our community</p>
          </div>

          <div className="gallery-grid">
            {[
              { src: '/images/rastasafari/gallery-1.jpg', alt: 'Village entrance' },
              { src: '/images/rastasafari/gallery-2.jpg', alt: 'River meditation' },
              { src: '/images/rastasafari/gallery-3.jpg', alt: 'Ital cooking', span: 'wide' },
              { src: '/images/rastasafari/gallery-4.jpg', alt: 'Community gathering' },
              { src: '/images/rastasafari/gallery-5.jpg', alt: 'Nature trails' },
            ].map((image, index) => (
              <div
                key={index}
                className={`gallery-item ${image.span ? `gallery-${image.span}` : ''}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="gallery-overlay">
                  <span>{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Live the Experience?</h2>
            <p>
              Join us for an unforgettable day in the heart of Rastafari culture.
              An adventure that will transform your view of the world.
            </p>
            <div className="cta-buttons">
              <Link href="/experiences" className="btn btn-primary">
                View Our Tours
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Base Styles with Rasta Colors */
        .about-page {
          --color-green-dark: #006B28;
          --color-green: #009B3A;
          --color-green-light: #00C853;
          --color-gold: #FED100;
          --color-gold-light: #FFE033;
          --color-red: #E31C23;
          --color-red-dark: #B71C1C;
          --color-cream: #f5f5dc;
          --color-white: #ffffff;
          --color-black: #1a1a1a;
          --color-gray: #666666;
          --color-gray-light: #e0e0e0;

          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: var(--color-black);
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--color-green) 0%, var(--color-green-light) 100%);
          color: var(--color-white);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-header.centered {
          text-align: center;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-green-dark);
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--color-gray);
          max-width: 600px;
        }

        .section-header.centered p {
          margin: 0 auto;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 107, 40, 0.7) 0%,
            rgba(0, 107, 40, 0.85) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 40px 20px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 8px 24px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          margin-bottom: 24px;
          line-height: 1.1;
          text-shadow: 2px 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          max-width: 700px;
          margin: 0 auto 48px;
          opacity: 0.95;
          line-height: 1.7;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .hero-stats .stat {
          text-align: center;
        }

        .hero-stats .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
          margin-bottom: 8px;
        }

        .hero-stats .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--color-white);
          opacity: 0.7;
          animation: bounce 2s infinite;
          z-index: 2;
        }

        .scroll-indicator span {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .scroll-indicator svg {
          width: 24px;
          height: 24px;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        /* Story Section */
        .story-section {
          padding: 120px 0;
          background: var(--color-white);
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-image-stack {
          position: relative;
        }

        .story-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .story-image.primary {
          position: relative;
          z-index: 1;
        }

        .story-image.secondary {
          position: absolute;
          width: 60%;
          bottom: -40px;
          right: -40px;
          z-index: 2;
          border: 6px solid var(--color-white);
        }

        .story-badge {
          position: absolute;
          top: -20px;
          left: -20px;
          z-index: 3;
          background: var(--color-gold);
          color: var(--color-green-dark);
          padding: 20px 24px;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(254, 209, 0, 0.4);
        }

        .badge-text {
          font-size: 0.85rem;
          font-weight: 700;
          text-align: center;
          line-height: 1.2;
        }

        .story-content h2 {
          font-size: 2.5rem;
          color: var(--color-green-dark);
          margin-bottom: 24px;
        }

        .story-content .lead {
          font-size: 1.2rem;
          color: var(--color-green);
          margin-bottom: 20px;
          font-weight: 500;
        }

        .story-content p {
          color: var(--color-gray);
          margin-bottom: 16px;
        }

        .story-features {
          display: flex;
          gap: 24px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-green-dark);
          font-weight: 500;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: rgba(0, 155, 58, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon svg {
          width: 20px;
          height: 20px;
          stroke: var(--color-green);
        }

        /* Culture Section */
        .culture-section {
          padding: 120px 0;
          background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-white) 100%);
        }

        .culture-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 80px;
        }

        .culture-card {
          background: var(--color-white);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .culture-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .culture-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--color-green) 0%, var(--color-green-light) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .culture-icon svg {
          width: 30px;
          height: 30px;
          stroke: var(--color-white);
        }

        .culture-card h3 {
          font-size: 1.4rem;
          color: var(--color-green-dark);
          margin-bottom: 16px;
        }

        .culture-card p {
          color: var(--color-gray);
          margin-bottom: 20px;
        }

        .culture-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .culture-list li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
          color: var(--color-green-dark);
          font-weight: 500;
          font-size: 0.95rem;
        }

        .culture-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: var(--color-gold);
          border-radius: 50%;
        }

        /* Timeline */
        .timeline-section {
          padding-top: 60px;
        }

        .timeline-section h3 {
          text-align: center;
          font-size: 2rem;
          color: var(--color-green-dark);
          margin-bottom: 50px;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, var(--color-green) 0%, var(--color-gold) 100%);
          border-radius: 3px;
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: calc(50% + 30px);
          position: relative;
          margin-bottom: 40px;
        }

        .timeline-item:nth-child(even) {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: calc(50% + 30px);
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-white);
          border: 3px solid var(--color-green);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .timeline-year {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-green-dark);
          text-align: center;
        }

        .timeline-content {
          background: var(--color-white);
          padding: 24px 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          max-width: 350px;
        }

        .timeline-content h4 {
          font-size: 1.1rem;
          color: var(--color-green-dark);
          margin-bottom: 8px;
        }

        .timeline-content p {
          color: var(--color-gray);
          font-size: 0.95rem;
          margin: 0;
        }

        /* Team Section */
        .team-section {
          padding: 120px 0;
          background: var(--color-white);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-bottom: 50px;
        }

        .team-card {
          background: var(--color-white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
        }

        .team-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .team-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 107, 40, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .team-card:hover .team-overlay {
          opacity: 1;
        }

        .team-overlay span {
          color: var(--color-white);
          font-weight: 600;
          padding: 12px 24px;
          border: 2px solid var(--color-white);
          border-radius: 30px;
        }

        .team-info {
          padding: 24px;
        }

        .team-info h3 {
          font-size: 1.2rem;
          color: var(--color-green-dark);
          margin-bottom: 4px;
        }

        .team-role {
          display: block;
          color: var(--color-gold);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .team-info p {
          color: var(--color-gray);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .team-note {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: rgba(0, 155, 58, 0.05);
          padding: 30px;
          border-radius: 16px;
          border-left: 4px solid var(--color-green);
        }

        .note-icon {
          width: 50px;
          height: 50px;
          background: var(--color-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .note-icon svg {
          width: 24px;
          height: 24px;
          stroke: var(--color-white);
        }

        .note-content h4 {
          font-size: 1.1rem;
          color: var(--color-green-dark);
          margin-bottom: 8px;
        }

        .note-content p {
          color: var(--color-gray);
          margin: 0;
        }

        /* Commitment Section */
        .commitment-section {
          padding: 120px 0;
          background: linear-gradient(135deg, var(--color-green-dark) 0%, var(--color-green) 100%);
          color: var(--color-white);
        }

        .commitment-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }

        .commitment-content .section-tag {
          background: rgba(255, 255, 255, 0.2);
        }

        .commitment-content h2 {
          color: var(--color-white);
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .commitment-content .lead {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .commitment-cards {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .commitment-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.1);
          padding: 24px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .commitment-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .commitment-icon.green { background: var(--color-green-light); }
        .commitment-icon.gold { background: var(--color-gold); }
        .commitment-icon.red { background: var(--color-red); }

        .commitment-icon svg {
          width: 24px;
          height: 24px;
          stroke: var(--color-white);
        }

        .commitment-card h4 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .commitment-card p {
          opacity: 0.85;
          font-size: 0.95rem;
          margin: 0;
        }

        .commitment-visual {
          position: relative;
        }

        .visual-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        }

        .visual-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          padding: 40px 30px 30px;
          text-align: center;
        }

        .visual-stat {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-gold);
        }

        .visual-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        /* Recognition Section */
        .recognition-section {
          padding: 120px 0;
          background: var(--color-cream);
        }

        .recognition-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .recognition-header h2 {
          font-size: 2.5rem;
          color: var(--color-green-dark);
          margin-top: 16px;
        }

        .recognition-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .recognition-main {
          background: var(--color-white);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .tripadvisor-badge {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 30px;
          border-bottom: 2px solid var(--color-gray-light);
          margin-bottom: 30px;
        }

        .badge-icon {
          width: 80px;
          height: 80px;
        }

        .badge-icon svg {
          width: 100%;
          height: 100%;
          fill: var(--color-green);
        }

        .badge-title {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-green-dark);
        }

        .badge-subtitle {
          color: var(--color-gray);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-card {
          text-align: center;
          padding: 20px;
          background: rgba(0, 155, 58, 0.05);
          border-radius: 12px;
        }

        .stat-card .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-green-dark);
          margin-bottom: 4px;
        }

        .stat-card .stat-label {
          color: var(--color-gray);
          font-size: 0.9rem;
        }

        .stat-stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-top: 10px;
        }

        .stat-stars svg {
          width: 18px;
          height: 18px;
          fill: var(--color-gold);
        }

        .stat-bar {
          height: 8px;
          background: var(--color-gray-light);
          border-radius: 4px;
          margin-top: 12px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-green) 0%, var(--color-gold) 100%);
          border-radius: 4px;
        }

        .stat-thumbs {
          margin-top: 10px;
        }

        .stat-thumbs svg {
          width: 24px;
          height: 24px;
          fill: var(--color-green);
        }

        .testimonial-highlight {
          background: linear-gradient(135deg, var(--color-green-dark) 0%, var(--color-green) 100%);
          padding: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
        }

        .testimonial-highlight blockquote {
          margin: 0;
        }

        .testimonial-highlight p {
          font-size: 1.3rem;
          color: var(--color-white);
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .testimonial-highlight footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .testimonial-highlight cite {
          color: var(--color-gold);
          font-style: normal;
          font-weight: 600;
        }

        .testimonial-date {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        /* Gallery Section */
        .gallery-section {
          padding: 120px 0;
          background: var(--color-white);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 250px;
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0, 107, 40, 0.9) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay span {
          color: var(--color-white);
          font-weight: 500;
        }

        .gallery-wide {
          grid-column: span 2;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
        }

        .cta-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          color: var(--color-green-dark);
          margin-bottom: 20px;
        }

        .cta-content p {
          font-size: 1.15rem;
          color: var(--color-green-dark);
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          padding: 16px 36px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: var(--color-green-dark);
          color: var(--color-white);
        }

        .btn-primary:hover {
          background: var(--color-green);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 107, 40, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-green-dark);
          border: 2px solid var(--color-green-dark);
        }

        .btn-secondary:hover {
          background: var(--color-green-dark);
          color: var(--color-white);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .story-grid,
          .commitment-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .story-image-stack {
            max-width: 500px;
            margin: 0 auto;
          }

          .culture-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .recognition-grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-stats {
            gap: 30px;
          }

          .hero-stats .stat-number {
            font-size: 2rem;
          }

          .story-image.secondary {
            position: relative;
            width: 100%;
            bottom: -20px;
            right: 0;
            margin-top: -40px;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-item,
          .timeline-item:nth-child(even) {
            padding-left: 80px;
            padding-right: 0;
            justify-content: flex-start;
          }

          .timeline-marker {
            left: 20px;
            width: 60px;
            height: 60px;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .gallery-wide {
            grid-column: span 1;
          }

          .section-header h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .story-badge {
            width: 80px;
            height: 80px;
            padding: 15px;
          }

          .commitment-card {
            flex-direction: column;
            text-align: center;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
