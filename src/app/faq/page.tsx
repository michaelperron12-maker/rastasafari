import Accordion, { FAQCategory } from '@/components/FAQ/Accordion';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FAQ - Rastasafari Experience',
  description:
    'Frequently asked questions about Rastasafari Experience. Find answers about bookings, ATV experience, logistics, and Ital food.',
  keywords: [
    'FAQ Rastasafari',
    'Jamaica FAQs',
    'ATV booking Jamaica',
    'Rasta experience',
    'Ital food',
  ],
};

const faqCategories: FAQCategory[] = [
  {
    title: 'Booking',
    icon: '📅',
    items: [
      {
        question: 'How do I book?',
        answer:
          'You can book online directly on our website or by phone at 876-445-7203. Our team is available to assist you and answer all your questions about your booking.',
      },
      {
        question: 'What is the price?',
        answer:
          'The price is $165 USD per person, all-inclusive. This includes round-trip transportation, the complete ATV experience, traditional Ital meal, drinks, and all scheduled activities.',
      },
      {
        question: 'What is the cancellation policy?',
        answer:
          'Cancellation is free if made more than 24 hours before the experience starts. No refund is possible for cancellations made less than 24 hours before departure.',
      },
      {
        question: 'What payment methods are accepted?',
        answer:
          'We accept credit cards via Stripe (Visa, MasterCard, American Express) as well as PayPal. Payment is secure and you will receive immediate confirmation by email.',
      },
    ],
  },
  {
    title: 'The Experience',
    icon: '🚙',
    items: [
      {
        question: 'How long is the experience?',
        answer:
          'The main experience lasts between 3.5 and 4 hours. With round-trip transportation from your hotel, plan for 4 to 5 hours total to fully enjoy this unique adventure.',
      },
      {
        question: 'What are the session times?',
        answer:
          'We offer three daily sessions: the morning session at 9:00 AM, the noon session at 12:00 PM, and the afternoon session at 2:30 PM. Choose the time that best fits your schedule.',
      },
      {
        question: 'What is the minimum age to participate?',
        answer:
          'The minimum age to participate is 4 years old. Children must be accompanied by an adult and will ride as passengers on the ATVs. Age-appropriate safety equipment is provided for all ages.',
      },
      {
        question: 'Do I need to know how to drive an ATV?',
        answer:
          'No, you do not need to know how to drive. Our experienced guides drive the ATVs for you, allowing you to fully enjoy the scenery and experience in complete safety.',
      },
    ],
  },
  {
    title: 'Logistics',
    icon: '🚐',
    items: [
      {
        question: 'Is transportation included?',
        answer:
          'Yes, round-trip transportation is included in the price. We provide pickup from Montego Bay, Negril, and Grand Palladium. The driver will contact you the day before to confirm the time and meeting point.',
      },
      {
        question: 'What should I bring?',
        answer:
          'We recommend bringing comfortable clothes (that can get dirty), a swimsuit for the river portion, sunscreen, closed-toe shoes, and a camera to capture your memories.',
      },
      {
        question: 'Are there changing rooms on site?',
        answer:
          'Yes, changing rooms are available on site. You can change comfortably before and after water activities. Secure lockers are also available.',
      },
    ],
  },
  {
    title: 'Food',
    icon: '🥗',
    items: [
      {
        question: 'What type of meal is served?',
        answer:
          'We serve a traditional Ital meal, which is organic vegetarian and vegan cuisine. Inspired by Rastafari philosophy, this cuisine uses fresh, natural, and local ingredients, without additives or preservatives.',
      },
      {
        question: 'How do you handle food allergies?',
        answer:
          'If you have food allergies or specific dietary restrictions, please let us know in advance when booking. We will do our best to adapt the meal to your needs.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#009B3A] via-[#FED100] to-[#E31C23]">
        <div className="absolute inset-0 bg-black/30" />
        <Image
          src="/images/rastasafari/safari-tour.jpg"
          alt="Rastasafari Experience FAQ"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Everything you need to know about Rastasafari Experience
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Accordion categories={faqCategories} />

          {/* Contact CTA */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center border border-[#009B3A]/20">
            <h3 className="text-2xl font-bold text-[#006B28] mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Feel free to contact us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:876-445-7203"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#009B3A] text-white font-semibold rounded-lg hover:bg-[#007B2E] transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                876-445-7203
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FED100] text-gray-900 font-semibold rounded-lg hover:bg-[#E5BC00] transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org FAQ structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((category) =>
              category.items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              }))
            ),
          }),
        }}
      />
    </main>
  );
}
