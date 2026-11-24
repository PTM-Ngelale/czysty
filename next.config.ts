import type { NextConfig } from 'next'

// Cleaning is no longer booked online — any old link into the cleaning flow
// goes straight to WhatsApp so the team can give a quote.
const CLEANING_QUOTE_URL =
  'https://wa.me/2348072133343?text=' +
  encodeURIComponent("Hi Czysty! I'd like a quote for cleaning. Here are the details of my space:")

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return ['space', 'service', 'supplies', 'schedule', 'extratasks'].map((step) => ({
      source: `/booking/${step}`,
      destination: CLEANING_QUOTE_URL,
      permanent: false,
    }))
  },
}

export default nextConfig
