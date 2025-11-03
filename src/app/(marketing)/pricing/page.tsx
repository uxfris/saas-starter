import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe/pricing";

export default function PricingPage() {
  return (
    <div className="container flex flex-col gap-8 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Choose the plan that's right for you. All plans include our core features.
        </p>
      </div>

      <div className="mx-auto grid gap-6 md:max-w-[64rem] md:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <Card key={plan.id} className={plan.highlighted ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.highlighted && <Badge>Popular</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="ml-2 text-muted-foreground">/{plan.interval}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} asChild>
                <Link href="/dashboard">
                  {plan.price === 0 ? "Get Started" : "Subscribe"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

