"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ErrorPage = ({ error }: { error: Error } & { reset: () => void }) => {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-lg text-gray-500">{error.message}</p>
      <Button onClick={() => router.refresh()}>Refresh</Button>
    </div>
  );
};

export default ErrorPage;
