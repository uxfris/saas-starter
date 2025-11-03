# Architecture Documentation

## Overview

This SaaS template follows a modern, scalable architecture built on Next.js 16 with the App Router, featuring a clean separation of concerns and production-ready integrations.

## Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives

### Backend & Database
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Supabase** - Auth & Database hosting

### Authentication & Authorization
- **Supabase Auth** - Authentication provider
- **JWT** - Token-based auth
- **RLS** - Row Level Security

### Payments
- **Stripe** - Payment processing
- **Stripe Webhooks** - Event handling

### AI Integration
- **OpenAI API** - AI capabilities
- **Usage tracking** - Token and limit management

### State Management
- **Server Actions** - Server state
- **Zustand** - Client state
- **React Cache** - Request memoization

### Validation
- **Zod** - Schema validation
- **Type inference** - Automatic TypeScript types

### Development Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

## Architecture Patterns

### 1. Server-First Architecture

The application prioritizes server-side rendering and server components:

```
Client Component (minimal)
    ↓
Server Component (default)
    ↓
Server Actions (data mutations)
    ↓
Database (via Prisma)
```

### 2. Feature-Based Organization

```
src/
├── app/                    # Routes and pages
├── components/            # Reusable components
├── lib/                   # Business logic
│   ├── actions/          # Server actions
│   ├── ai/              # AI integration
│   ├── stripe/          # Payment logic
│   ├── supabase/        # Auth client
│   ├── utils/           # Utilities
│   └── validation/      # Schemas
├── hooks/                # React hooks
└── types/               # TypeScript types
```

### 3. Layered Architecture

**Presentation Layer** (`app/`, `components/`)
- Pages and UI components
- Client-side interactions
- Form handling

**Business Logic Layer** (`lib/actions/`, `lib/*/`)
- Server actions
- Business rules
- Integration logic

**Data Access Layer** (`lib/db.ts`, Prisma)
- Database queries
- ORM operations
- Data models

**External Services Layer** (`lib/stripe/`, `lib/ai/`, `lib/supabase/`)
- Third-party integrations
- API clients
- Service wrappers

## Data Flow

### Authentication Flow

```
1. User submits credentials
   ↓
2. Server Action validates with Zod
   ↓
3. Supabase Auth authenticates
   ↓
4. JWT token stored in cookie
   ↓
5. Middleware validates on each request
   ↓
6. Protected routes accessible
```

### Payment Flow

```
1. User selects plan
   ↓
2. Server Action creates Stripe Checkout
   ↓
3. User completes payment
   ↓
4. Stripe sends webhook
   ↓
5. Webhook handler processes event
   ↓
6. Database updated with subscription
   ↓
7. User gains access to features
```

### AI Generation Flow

```
1. User submits prompt
   ↓
2. Server Action validates input
   ↓
3. Check usage limits
   ↓
4. Call OpenAI API
   ↓
5. Track usage in database
   ↓
6. Return generated content
```

## Security

### Authentication Security
- JWT-based sessions
- HTTP-only cookies
- Secure cookie flags in production
- Row Level Security (RLS)

### API Security
- Server Actions for mutations
- Input validation with Zod
- Rate limiting (recommended)
- CSRF protection

### Data Security
- Environment variable validation
- Sensitive data in server-only files
- Database connection pooling
- Prepared statements (via Prisma)

## Performance Optimizations

### Server Components
- Default to server components
- Reduced JavaScript bundle size
- Faster initial page loads

### Database
- Connection pooling
- Query optimization
- Indexed fields
- Efficient relations

### Caching
- React Cache for request deduplication
- Next.js automatic caching
- Revalidation strategies

### Code Splitting
- Automatic code splitting by route
- Dynamic imports for heavy components
- Lazy loading where appropriate

## Deployment Architecture

```
User Request
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js Server (Serverless Functions)
    ↓
┌─────────────┬──────────────┬─────────────┐
│   Supabase  │    Stripe    │   OpenAI    │
│  (Auth/DB)  │  (Payments)  │    (AI)     │
└─────────────┴──────────────┴─────────────┘
```

## Scalability Considerations

### Horizontal Scaling
- Stateless server architecture
- Database connection pooling
- Distributed session storage

### Database Scaling
- Read replicas (future)
- Query optimization
- Proper indexing
- Connection pooling

### API Rate Limiting
- Per-user rate limits
- Redis for distributed limiting (future)
- Graceful degradation

### Monitoring
- Error tracking (Sentry recommended)
- Performance monitoring
- Usage analytics
- Log aggregation

## Testing Strategy

### Unit Tests
- Business logic functions
- Utility functions
- Validation schemas

### Integration Tests
- Server Actions
- API endpoints
- Database operations

### E2E Tests
- Critical user flows
- Payment flow
- Auth flow

## Environment Management

### Development
- Local PostgreSQL or Supabase
- Stripe test mode
- OpenAI with usage limits

### Staging
- Dedicated database
- Stripe test mode
- Separate env variables

### Production
- Production database with backups
- Stripe live mode
- Production API keys
- Enhanced monitoring

## Best Practices

### Code Organization
- One component per file
- Colocate related files
- Clear naming conventions
- Consistent file structure

### Type Safety
- Strict TypeScript mode
- Infer types from Zod schemas
- Use Prisma types
- Avoid `any` type

### Error Handling
- Custom error classes
- Consistent error responses
- User-friendly messages
- Detailed logging

### Validation
- Client-side validation (UX)
- Server-side validation (security)
- Zod schemas
- Type inference

## Future Enhancements

### Planned Features
- [ ] Real-time features (WebSockets)
- [ ] Advanced analytics
- [ ] Team/organization support
- [ ] API for external integrations
- [ ] Mobile app
- [ ] Advanced AI features

### Infrastructure
- [ ] Redis for caching
- [ ] Queue system (BullMQ)
- [ ] CDN for assets
- [ ] Multi-region deployment

### Monitoring
- [ ] APM integration
- [ ] Custom dashboards
- [ ] Automated alerts
- [ ] Performance budgets

