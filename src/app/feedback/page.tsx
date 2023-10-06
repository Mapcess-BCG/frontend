import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AccessibilityIcon, StarIcon } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export default async function SearchResults({
  searchParams: { location },
}: {
  searchParams: { location?: string };
}) {
  if (!location) {
    return null;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-4 p-4">
      <h1 className="text-2xl">Review</h1>
      <h2 className="text-xl text-muted-foreground">
        How was your route to {location}?
      </h2>
      <FeedbackForm />
    </main>
  );
}
