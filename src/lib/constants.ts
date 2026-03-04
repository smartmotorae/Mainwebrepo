/**
 * Smart Motor — Single Source of Truth for Business Constants
 * All contact details, hours, and business info lives here.
 * Update this file to propagate changes across the entire site.
 */

export const BUSINESS = {
  name: 'Smart Motor Auto Repair',
  tagline: "Abu Dhabi's Premier Automotive Atelier — Est. 2009",
  established: '2009',

  // --- Contact ---
  phone: '+971 2 555 5443',
  phoneTel: '+97125555443',
  tollfree: '800 76278',
  tollfreeTel: '80076278',
  whatsapp: '+971 52 555 5443',
  whatsappUrl: 'https://wa.me/971525555443',
  email: 'info@smartmotor.ae',

  // --- Location ---
  address: 'M9, Musaffah Industrial Area, Abu Dhabi, UAE',
  addressStreet: 'M9, Musaffah Industrial Area',
  addressCity: 'Abu Dhabi',
  addressCountry: 'AE',
  mapsUrl: 'https://maps.google.com/?q=Smart+Motor+Auto+Repair+Musaffah+Abu+Dhabi',
  geo: {
    latitude: '24.4539',
    longitude: '54.3773',
  },

  // --- Operating Hours (AUTHORITATIVE) ---
  hours: {
    weekdays: 'Mon – Sat: 08:00 – 19:00',
    weekend: 'Sunday: Closed',
    open: '08:00',
    close: '19:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    closedDays: ['Sunday'],
    displayShort: 'Mon–Sat 08:00–19:00',
    displayFull: 'Monday to Saturday, 8:00 AM to 7:00 PM. Closed on Sundays.',
  },

  // --- Social ---
  social: {
    instagram: 'https://instagram.com/smartmotor_autorepair',
    facebook: 'https://facebook.com/smartmotorae',
    tiktok: 'https://tiktok.com/@smartmotorae',
    threads: 'https://threads.net/@smartmotor_autorepair',
  },

  // --- SEO ---
  siteUrl: 'https://smartmotor.ae',
  priceRange: '$$$',

  serviceAreas: [
    {
      slug: 'musaffah-m9',
      name: 'Musaffah M9',
      title: 'Car Service Musaffah M9',
      description: 'Expert European car repair and maintenance services located in the heart of Musaffah M9, Abu Dhabi.',
      keywords: ['car repair Musaffah', 'garage Musaffah M9', 'auto service Musaffah']
    },
    {
      slug: 'khalifa-city',
      name: 'Khalifa City',
      title: 'Car Service Khalifa City',
      description: 'Premium automotive services for residents of Khalifa City. We provide specialized care for luxury European vehicles with pickup and delivery.',
      keywords: ['car service Khalifa City', 'BMW repair Khalifa City', 'Mercedes service Khalifa City']
    },
    {
      slug: 'al-reem-island',
      name: 'Al Reem Island',
      title: 'Car Service Al Reem Island',
      description: 'Specialized car repair and detailing services for Al Reem Island. Professional maintenance for high-end European cars.',
      keywords: ['car service Al Reem Island', 'auto repair Al Reem', 'luxury car care Reem Island']
    }
  ],

  // --- Stats ---
  stats: {
    yearsExp: '17+',
    yearsExpLabel: 'Years Experience',
    yearsExpTooltip: 'Serving Abu Dhabi since 2009',
    clients: '1,000+',
    clientsLabel: 'Satisfied Clients',
    clientsTooltip: 'Trusted by 1000+ vehicle owners',
    technicians: '50+',
    techniciansLabel: 'Factory-Certified Technicians',
    techniciansTooltip: 'Expert technicians across all brands',
    warranty: '6-Month',
    warrantyLabel: 'Labour Warranty',
    rating: '4.9',
    ratingLabel: 'Google Rating',
    reviewCount: '127',
  },
} as const
