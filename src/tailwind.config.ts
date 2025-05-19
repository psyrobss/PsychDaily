import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-geist-mono)'],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.foreground / 0.9'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-lead': theme('colors.foreground / 0.8'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.foreground / 0.9'),
            '--tw-prose-counters': theme('colors.muted.foreground'),
            '--tw-prose-bullets': theme('colors.primary.DEFAULT / 0.5'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.accent.foreground / 0.9'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-captions': theme('colors.muted.foreground'),
            '--tw-prose-code': theme('colors.foreground'),
            '--tw-prose-pre-code': theme('colors.popover.foreground'),
            '--tw-prose-pre-bg': theme('colors.popover.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
            '--tw-prose-invert-body': theme('colors.foreground / 0.9'), 
            '--tw-prose-invert-headings': theme('colors.primary.DEFAULT'), 
            '--tw-prose-invert-lead': theme('colors.foreground / 0.8'), 
            '--tw-prose-invert-links': theme('colors.primary.DEFAULT'), 
            '--tw-prose-invert-bold': theme('colors.foreground / 0.9'), 
            '--tw-prose-invert-counters': theme('colors.muted.foreground'), 
            '--tw-prose-invert-bullets': theme('colors.primary.DEFAULT / 0.5'), 
            '--tw-prose-invert-hr': theme('colors.border'), 
            '--tw-prose-invert-quotes': theme('colors.accent.foreground / 0.9'), 
            '--tw-prose-invert-quote-borders': theme('colors.accent.DEFAULT'), 
            '--tw-prose-invert-captions': theme('colors.muted.foreground'), 
            '--tw-prose-invert-code': theme('colors.foreground'), 
            '--tw-prose-invert-pre-code': theme('colors.popover.foreground'), 
            '--tw-prose-invert-pre-bg': theme('colors.popover.DEFAULT'), 
            '--tw-prose-invert-th-borders': theme('colors.border'), 
            '--tw-prose-invert-td-borders': theme('colors.border'), 
            h1: { fontFamily: theme('fontFamily.serif').join(', '), color: 'var(--tw-prose-headings)' },
            h2: { fontFamily: theme('fontFamily.serif').join(', '), color: 'var(--tw-prose-headings)' },
            h3: { fontFamily: theme('fontFamily.serif').join(', '), color: 'var(--tw-prose-headings)' },
            h4: { fontFamily: theme('fontFamily.serif').join(', '), color: 'var(--tw-prose-headings)' },
            p: { fontFamily: theme('fontFamily.serif').join(', '), lineHeight: theme('lineHeight.relaxed'), color: 'var(--tw-prose-body)' },
            li: { fontFamily: theme('fontFamily.serif').join(', '), marginY: theme('spacing.1'), color: 'var(--tw-prose-body)' },
            'ul > li::before': { backgroundColor: 'var(--tw-prose-bullets)' },
            'ol > li::before': { color: 'var(--tw-prose-counters)' },
            blockquote: { 
              fontFamily: theme('fontFamily.serif').join(', '),
              color: 'var(--tw-prose-quotes)',
              borderColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.accent.DEFAULT / 0.1'), 
              paddingTop: theme('spacing.3'), 
              paddingBottom: theme('spacing.3'),
              paddingLeft: theme('spacing.4'),
              paddingRight: theme('spacing.4'),
              borderRadius: theme('borderRadius.md'),
             },
             'blockquote p': { 
                fontFamily: theme('fontFamily.serif').join(', '),
                color: 'var(--tw-prose-quotes)',
             },
             figure: {
                marginTop: theme('spacing.6'),
                marginBottom: theme('spacing.6'),
             },
             figcaption: {
                fontFamily: theme('fontFamily.sans').join(', '),
                color: 'var(--tw-prose-captions)',
             },
             a: {
                color: 'var(--tw-prose-links)',
                textDecoration: 'underline',
                '&:hover': {
                    color: theme('colors.accent.DEFAULT'),
                },
             },
             strong: { color: 'var(--tw-prose-bold)'},
             em: { color: 'var(--tw-prose-body)'}, 
          },
        },
        lg: { 
            css: {
                p: { lineHeight: '1.75' }, 
                h1: { fontSize: theme('fontSize.4xl') }, 
                h2: { fontSize: theme('fontSize.3xl') }, 
                h3: { fontSize: theme('fontSize.2xl') }, 
                blockquote: {
                    paddingTop: theme('spacing.4'),
                    paddingBottom: theme('spacing.4'),
                    paddingLeft: theme('spacing.6'),
                    paddingRight: theme('spacing.6'),
                }
            }
        }
      }),
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
