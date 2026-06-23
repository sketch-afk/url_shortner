# URL Shortener

A modern URL shortener built with Next.js 16, featuring a cosmic dark theme with animated 3D visuals.

## Features

- Shorten long URLs into shareable short links
- Custom slug support
- Click tracking per link
- Dashboard to manage all your links
- Authentication via NextAuth (credentials)
- Cosmic dark theme with animated gradient shapes

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** NextAuth v4
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, GSAP, Three.js
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
app/             - App router pages and API routes
components/      - React components
  ui/            - UI components (shadcn-style)
lib/             - Utility functions and database connection
models/          - Mongoose models
types/           - TypeScript type definitions
```
