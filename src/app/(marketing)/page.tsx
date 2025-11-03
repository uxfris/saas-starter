import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 pb-8 pt-6 md:py-12 md:pb-12 lg:py-24">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Build your SaaS product{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              faster than ever
            </span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            A production-ready Next.js template with authentication, payments, AI
            integrations, and more. Start building your SaaS in minutes, not months.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Everything you need to launch
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            All the features and integrations you need to build a modern SaaS application.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 pt-4">
              <h3 className="font-bold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Secure authentication with Supabase Auth. Email/password, magic links, and
                OAuth providers.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 pt-4">
              <h3 className="font-bold">Payments</h3>
              <p className="text-sm text-muted-foreground">
                Stripe integration with subscription billing, webhooks, and customer portal.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2 pt-4">
              <h3 className="font-bold">AI Integration</h3>
              <p className="text-sm text-muted-foreground">
                OpenAI integration with usage tracking and limits. Ready for AI-powered
                features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container flex flex-col items-center gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to get started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Start building your SaaS today with our production-ready template.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
