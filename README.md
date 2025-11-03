# SaaS Template - Production Ready

A comprehensive, production-ready SaaS template built with Next.js 16, featuring authentication, payments, AI integrations, and modern tooling.

## 🚀 Features

- **⚡ Next.js 16** - App Router, Server Components, TypeScript
- **🎨 Modern UI** - Tailwind CSS + shadcn/ui components
- **🔐 Authentication** - Supabase Auth with JWT and Row Level Security
- **💳 Payments** - Stripe subscriptions with webhooks
- **🤖 AI Integration** - OpenAI API with usage tracking
- **📊 Database** - Prisma ORM with PostgreSQL
- **✅ Validation** - Zod schemas for type-safe validation
- **🎯 State Management** - Server Actions + Zustand for client state
- **🛠️ Developer Tools** - ESLint, Prettier, Husky, lint-staged
- **📦 Deployment** - Optimized for Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Supabase account
- Stripe account
- OpenAI API key

## 🔧 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo>
cd template
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Run seed
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages (home, pricing)
│   ├── dashboard/         # Protected dashboard pages
│   ├── api/              # API routes (webhooks)
│   └── login/            # Auth pages
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (navbar, sidebar)
│   └── shared/           # Shared components
├── lib/
│   ├── actions/          # Server actions
│   ├── ai/               # OpenAI integration
│   ├── stripe/           # Stripe integration
│   ├── supabase/         # Supabase clients
│   ├── utils/            # Utility functions
│   └── validation/       # Zod schemas
├── hooks/                # React hooks
└── types/                # TypeScript types
```

## 🔑 Key Features Explained

### Authentication

- Built with Supabase Auth
- Email/password authentication
- Protected routes with middleware
- Server-side session management

### Payments

- Stripe subscription billing
- Webhook handling for subscription events
- Customer portal for subscription management
- Multiple pricing tiers

### AI Integration

- OpenAI API integration
- Usage tracking per user
- Monthly limits by subscription tier
- Content generation features

### Database

- Prisma ORM with PostgreSQL
- Type-safe database queries
- Automatic migrations
- Seed scripts for development

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Create and run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 🔐 Security

- Environment variables validated with Zod
- Row Level Security (RLS) with Supabase
- CSRF protection
- Secure password requirements
- API rate limiting (recommended to implement)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables

Make sure to set all required environment variables in your deployment platform.

## 🎨 Customization

### Styling

- Edit `src/app/globals.css` for global styles
- Customize theme in `components.json`
- Modify Tailwind config as needed

### Pricing Plans

Edit pricing tiers in `src/lib/stripe/pricing.ts`

### AI Prompts

Customize AI prompts in `src/lib/ai/prompts/`

## 🧪 Testing

```bash
# Add your testing commands here
npm run test
```

## 📝 License

MIT License - feel free to use this template for your projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [OpenAI](https://openai.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
