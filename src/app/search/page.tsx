import { Search } from "@/components/search-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AccessibilityIcon, StarIcon } from "lucide-react";
import { getRoutes } from "@/api/routeService";
import dynamic from "next/dynamic";
const MainMap = dynamic(() => import("@/components/main-map"), { ssr: false });

export default async function SearchResults({
  searchParams: { location, origin },
}: {
  searchParams: { location?: string; origin?: string };
}) {
  if (!location || !origin) {
    return null;
  }

  const results = await getRoutes(origin, location);
  const highestScore = Math.max(
    ...results.map((result) => result.accessibilityScore),
  );

  return (
    <main className="container flex min-h-screen w-full flex-col items-center gap-4 p-4">
      <Search className="z-10" location={location} backButton origin={origin} />
      <ul className="container z-10 max-w-md space-y-6">
        {results.map((result) => (
          <li key={result.id}>
            <Link
              className="relative flex gap-2 rounded-md border bg-background/80 p-4"
              href={`/result?location=${location}&id=${result.id}&origin=${origin}`}
            >
              {result.accessibilityScore === highestScore && (
                <div className="absolute -right-2 -top-2 flex h-fit w-fit items-center justify-center rounded-full bg-muted p-2">
                  <StarIcon className="h-6 w-6  text-yellow-500" />
                </div>
              )}
              <div className="flex flex-col">
                <span
                  className={cn(
                    result.accessibilityScore <= 3.5 && "text-yellow-500",
                    result.accessibilityScore <= 2.5 && "text-red-500",
                  )}
                >
                  {result.accessibilityScore} accessibility
                </span>
                <span className="text-muted-foreground">
                  {result.timeMinutes} minutes
                </span>
                <span className="text-muted-foreground">
                  {result.wheelchairAccessible && (
                    <AccessibilityIcon className="h-4 w-4" />
                  )}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <MainMap
        startLocation={
          results?.length ? results[0]?.polyline?.[0]?.[0] : undefined
        }
        polyline={results.flatMap((result) => result.polyline)}
      />
    </main>
  );
}
