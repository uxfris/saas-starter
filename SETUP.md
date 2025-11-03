# Setup Guide

This guide will help you set up the SaaS template from scratch.

## 1. Prerequisites

Ensure you have the following installed and ready:

- **Node.js 18+** and npm
- **PostgreSQL** database (local or hosted)
- **Supabase** account ([supabase.com](https://supabase.com))
- **Stripe** account ([stripe.com](https://stripe.com))
- **OpenAI** account ([platform.openai.com](https://platform.openai.com))

## 2. Database Setup

### Option A: Using Supabase (Recommended)

1. Create a new project on Supabase
2. Go to Settings > Database
3. Copy the connection string (Connection Pooling recommended)
4. Use this as your `DATABASE_URL`

### Option B: Local PostgreSQL

```bash
# Install PostgreSQL
# macOS
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb saas_template
```

## 3. Supabase Configuration

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Get API Keys**
   - Go to Settings > API
   - Copy `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

3. **Enable Email Auth**
   - Go to Authentication > Providers
   - Enable Email provider
   - Configure email templates (optional)

## 4. Stripe Configuration

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Use test mode for development

2. **Get API Keys**
   - Go to Developers > API keys
   - Copy `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copy `Secret key` → `STRIPE_SECRET_KEY`

3. **Create Products and Prices**
   - Go to Products > Add product
   - Create your pricing tiers
   - Copy the Price IDs
   - Update `src/lib/stripe/pricing.ts` with your Price IDs

4. **Set Up Webhooks**
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`

## 5. OpenAI Configuration

1. **Get API Key**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Navigate to API keys
   - Create new secret key
   - Copy key → `OPENAI_API_KEY`

2. **Set Usage Limits** (Optional)
   - Go to Settings > Limits
   - Set monthly budget limits

## 6. Environment Variables

Create `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas_template"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

## 7. Database Migration

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Run seed
npm run db:seed
```

## 8. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 9. Testing Webhooks Locally

Use Stripe CLI for local webhook testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Use the webhook signing secret provided by the CLI
# Add it to your .env.local as STRIPE_WEBHOOK_SECRET
```

## 10. Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

**Important:** Update these for production:
- `NEXT_PUBLIC_APP_URL` → your production URL
- `NODE_ENV` → "production"
- Use Stripe live keys instead of test keys
- Update webhook endpoint in Stripe dashboard

### Post-Deployment

1. **Update Stripe Webhook**
   - Add production webhook endpoint
   - Copy new webhook secret
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel

2. **Update Supabase Redirect URLs**
   - Go to Authentication > URL Configuration
   - Add your production URL to allowed redirect URLs

3. **Test Everything**
   - Sign up flow
   - Payment flow
   - AI features
   - Webhook handling

## 11. Customization

### Update Branding

1. Replace site name in `src/lib/config.ts`
2. Update metadata in `src/app/layout.tsx`
3. Add your logo to `/public`
4. Update favicon

### Configure Pricing

1. Edit `src/lib/stripe/pricing.ts`
2. Update pricing plans with your Stripe Price IDs
3. Adjust usage limits in `src/lib/config.ts`

### Customize Email Templates

In Supabase:
- Go to Authentication > Email Templates
- Customize templates for:
  - Confirmation email
  - Password reset
  - Magic link

## 12. Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Check connection string format
# Should be: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Stripe Webhook Not Working

- Verify webhook endpoint URL
- Check webhook signing secret
- Look at webhook logs in Stripe dashboard
- Verify selected events

### Authentication Issues

- Check Supabase project URL and keys
- Verify allowed redirect URLs in Supabase
- Check browser console for errors

## 13. Next Steps

- [ ] Customize branding and styling
- [ ] Add more features
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Configure analytics (PostHog, Plausible, etc.)
- [ ] Add automated tests
- [ ] Set up CI/CD pipeline
- [ ] Configure backup strategy
- [ ] Add documentation for your specific features

## Need Help?

- Check the README.md for detailed documentation
- Review the code comments
- Check the official documentation:
  - [Next.js](https://nextjs.org/docs)
  - [Supabase](https://supabase.com/docs)
  - [Stripe](https://stripe.com/docs)
  - [Prisma](https://www.prisma.io/docs)
  - [OpenAI](https://platform.openai.com/docs)

