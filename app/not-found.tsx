// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 sm:p-8">
          <p className="text-sm text-muted-foreground">404</p>

          <h1 className="mt-2 text-2xl font-bold">Page not found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The page <span className="font-medium text-foreground">{pathname}</span> doesn’t exist
            (or has moved).
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Go home</Link>
            </Button>

          </div>

          <div className="mt-6 rounded-md border bg-background px-3 py-2 text-xs text-muted-foreground">
            Tip: check the URL spelling, or use the navigation above.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
