import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
			extend: {
				colors: {
					border: 'hsl(var(--border))',
					input: 'hsl(var(--input))',
					ring: 'hsl(var(--ring))',
					background: 'hsl(var(--background))',
					foreground: 'hsl(var(--foreground))',
					primary: {
						DEFAULT: 'hsl(var(--primary))',
						foreground: 'hsl(var(--primary-foreground))'
					},
					secondary: {
						DEFAULT: 'hsl(var(--secondary))',
						foreground: 'hsl(var(--secondary-foreground))'
					},
					destructive: {
						DEFAULT: 'hsl(var(--destructive))',
						foreground: 'hsl(var(--destructive-foreground))'
					},
					muted: {
						DEFAULT: 'hsl(var(--muted))',
						foreground: 'hsl(var(--muted-foreground))'
					},
					accent: {
						DEFAULT: 'hsl(var(--accent))',
						foreground: 'hsl(var(--accent-foreground))'
					},
					popover: {
						DEFAULT: 'hsl(var(--popover))',
						foreground: 'hsl(var(--popover-foreground))'
					},
					card: {
						DEFAULT: 'hsl(var(--card))',
						foreground: 'hsl(var(--card-foreground))'
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
					},
					// Extended brand palette for tech startup
					'tech-blue': 'hsl(var(--tech-blue))',
					'startup-yellow': 'hsl(var(--startup-yellow))',
					'electric-blue': 'hsl(var(--electric-blue))',
					'cyber-yellow': 'hsl(var(--cyber-yellow))',
					'innovation-blue': 'hsl(var(--innovation-blue))',
					'brand': 'hsl(var(--brand))',
					'success-green': 'hsl(var(--success-green))',
					'success-green-light': 'hsl(var(--success-green-light))'
				},
				borderRadius: {
					lg: 'var(--radius)',
					md: 'calc(var(--radius) - 2px)',
					sm: 'calc(var(--radius) - 4px)'
				},
				keyframes: {
					// Accordion
					'accordion-down': { from: { height: '0', opacity: '0' }, to: { height: 'var(--radix-accordion-content-height)', opacity: '1' } },
					'accordion-up': { from: { height: 'var(--radix-accordion-content-height)', opacity: '1' }, to: { height: '0', opacity: '0' } },
					// Fade
					'fade-in': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
					'fade-out': { '0%': { opacity: '1', transform: 'translateY(0)' }, '100%': { opacity: '0', transform: 'translateY(10px)' } },
					// Scale
					'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
					'scale-out': { from: { transform: 'scale(1)', opacity: '1' }, to: { transform: 'scale(0.95)', opacity: '0' } },
					// Slide
					'slide-in-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
					'slide-out-right': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(100%)' } },
					// Heartbeat for CTA
					heartbeat: {
						'0%': { transform: 'scale(1)' },
						'14%': { transform: 'scale(1.08)' },
						'28%': { transform: 'scale(1)' },
						'42%': { transform: 'scale(1.06)' },
						'70%': { transform: 'scale(1)' }
					},
					// Tech pulse
					'tech-pulse': {
						'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
						'50%': { opacity: '0.8', transform: 'scale(1.1)' }
					},
					// Float animation
					'float': {
						'0%, 100%': { transform: 'translateY(0px)' },
						'50%': { transform: 'translateY(-20px)' }
					}
				},
				animation: {
					'accordion-down': 'accordion-down 0.2s ease-out',
					'accordion-up': 'accordion-up 0.2s ease-out',
					'fade-in': 'fade-in 0.3s ease-out',
					'fade-out': 'fade-out 0.3s ease-out',
					'scale-in': 'scale-in 0.2s ease-out',
					'scale-out': 'scale-out 0.2s ease-out',
					'slide-in-right': 'slide-in-right 0.3s ease-out',
					'slide-out-right': 'slide-out-right 0.3s ease-out',
					'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
					'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
					heartbeat: 'heartbeat 1.6s ease-in-out infinite',
					'tech-pulse': 'tech-pulse 3s ease-in-out infinite',
					'float': 'float 6s ease-in-out infinite'
				}
			}

	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
