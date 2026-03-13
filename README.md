### Herly Landing Page
A modern, responsive landing page for Herly, a platform where women share opportunities, network, and help each other thrive in industries, roles, and spaces where they already excel. This project showcases a fully responsive, animated, and visually engaging front-end built with HTML, CSS, and vanilla JavaScript.

## Project Overview
Herly’s landing page is designed to:
- Highlight the platform’s mission and value proposition.
- Showcase how Herly works through illustrative scenes.
- Collect email signups through waitlist forms with validation.
- Include dynamic stats, interactive animations, and a modern UI.
- Be fully responsive for mobile, tablet, and desktop devices.
- This landing page is fully frontend-focused, with placeholders for images and potential backend integration (like Supabase or other APIs for waitlist submissions).

## Features
- Navigation & Hero
- Sticky navigation bar with smooth scroll links.
- Hero section with gradient overlays and responsive hero image.
- Call-to-action button to join the waitlist.
- Forms & Validation
- Waitlist forms with real-time email validation.
- Success and error messages styled according to project theme.
- JavaScript integration for form submission feedback.

## Content Sections
- Stats section with data on women in the workforce.
- "How It Works" section with visual scenes and hover effects.
- Gatekeeping & final CTA sections with compelling copy.
- Animations & Effects
- Fade-up animations on text and images using CSS keyframes.
- Hover effects on buttons and scene cards.
- Smooth scroll behavior for internal links.
- Footer with logo, tagline, and copyright.

## Responsive Design
- Mobile-first approach with breakpoints for tablets and desktops.
- Grid and flex layouts for adaptive content positioning.

## Technologies Used
- HTML5 – Semantic structure for sections and content.
- CSS3 – Modern styling, CSS variables, animations, and responsive layout.
- JavaScript – Form validation, DOM manipulation, and scroll behavior.
- Supabase JS – Placeholder for future backend email integrations.
- Fonts – 'DM Sans' for body text and 'Cormorant Garamond' for headings.

Folder Structure
herly-landing/
│
├─ index.html       # Main landing page
├─ style.css                # Styles and animations
├─ script.js                # Form validation and interactivity
├─ config.js                # Supabase or other backend configs
├─ images/
│   ├─ hero-image.jpg       # Hero section main image
│   ├─ overlay.jpg          # Hero section overlay effect
│   ├─ whisper.jpg            # Scene image
│   ├─ trust.jpg            # Scene image
│   └─ accountability.jpg             # Scene image
└─ README.md                # Project documentation

## Installation & Usage
- Clone the repository
git clone https://github.com/blessingndeks/herly.git

** Open index.html in your browser:
** No server required for basic HTML/CSS/JS functionality.
** Ensure all images are in the same directory or update src paths.
** Test form validation
** Enter a valid email to see the success message.
** Enter an invalid email to see the error message.
** Optional Backend Integration
** Connect to Supabase or another backend to capture waitlist emails.
** Update script.js with your endpoint and API keys.