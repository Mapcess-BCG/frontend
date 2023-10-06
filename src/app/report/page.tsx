import { ReportForm } from "@/components/report-form";

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
      <h1 className="text-2xl">Report</h1>
      <h2 className="text-xl text-muted-foreground">
        Report an obstacle on the way to {location}.
      </h2>
      <ReportForm />
    </main>
  );
}
