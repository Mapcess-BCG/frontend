import { BackButton } from "@/components/back-button";
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
      <BackButton className="absolute left-4 top-4" />
      <h1 className="text-2xl">Review</h1>
      <h2 className="text-xl text-muted-foreground">
        How was your route to {location}?
      </h2>
      <FeedbackForm />
    </main>
  );
}
