import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Sparkles, CreditCard, Activity, TrendingUp } from "lucide-react";

async function getDashboardData(userId: string) {
  const [usage, subscription] = await Promise.all([
    prisma.usage.aggregate({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: {
        amount: true,
      },
    }),
    prisma.subscription.findUnique({
      where: { userId },
    }),
  ]);

  return {
    usage: usage._sum.amount || 0,
    subscription,
  };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  const data = await getDashboardData(user.id);

  const stats = [
    {
      title: "AI Usage",
      value: `${data.usage.toLocaleString()} tokens`,
      description: "This month",
      icon: Sparkles,
    },
    {
      title: "Subscription",
      value: data.subscription?.status || "Free",
      description: data.subscription?.currentPeriodEnd
        ? `Renews ${new Date(data.subscription.currentPeriodEnd).toLocaleDateString()}`
        : "No active subscription",
      icon: CreditCard,
    },
    {
      title: "Account Status",
      value: "Active",
      description: "All systems operational",
      icon: Activity,
    },
    {
      title: "Plan Limit",
      value: "10,000 tokens",
      description: `${((data.usage / 10000) * 100).toFixed(0)}% used`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.email}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick links to help you get started with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Set up your profile</h3>
            <p className="text-sm text-muted-foreground">
              Complete your profile to get the most out of the platform
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Connect integrations</h3>
            <p className="text-sm text-muted-foreground">
              Connect your favorite tools and services
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Try AI features</h3>
            <p className="text-sm text-muted-foreground">
              Explore our AI-powered content generation tools
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

