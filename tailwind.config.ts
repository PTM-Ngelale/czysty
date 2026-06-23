import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Czysty Cleaners brand palette — derived from logo
        'czysty-black':  '#09100A',  // page background / hero overlay
        'czysty-green':  '#1A5C28',  // primary CTA buttons, highlights, accents
        'czysty-red':    '#8B1A1A',  // secondary accent (logo crimson hook)
        'czysty-cream':  '#F2EDE4',  // body text on dark backgrounds
        'czysty-grey':   '#131A14',  // card / section backgrounds
        'czysty-light':  '#C8E6CE',  // section tag labels, soft accents
        'czysty-muted':  '#6B7B6B',  // footnotes, placeholder text
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
