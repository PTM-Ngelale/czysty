import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Czysty brand palette — from the Nov 2026 laundry subscription flyer
        'czysty-black':  '#022811',  // page background / hero overlay
        'czysty-green':  '#085d33',  // primary CTA buttons, highlights, accents
        'czysty-red':    '#1f7a45',  // secondary green accent (was crimson; flyer has no red)
        'czysty-cream':  '#f4fbf5',  // body text on dark backgrounds
        'czysty-grey':   '#02552c',  // deep flyer green — dark sections
        'czysty-light':  '#c9edd1',  // section tag labels, soft accents
        'czysty-muted':  '#4f6b58',  // footnotes, placeholder text
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
