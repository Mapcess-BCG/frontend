import { MainMap } from "@/components/main-map";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AccessibilityIcon, StarIcon } from "lucide-react";

const fetchResults = async (location: string) => {
  return [
    {
      id: "1",
      accessibilityScore: 4.5,
      timeMinutes: 10,
      wheelChairAccessible: true,
    },
    {
      id: "2",
      accessibilityScore: 3.5,
      timeMinutes: 15,
      wheelChairAccessible: true,
    },
    {
      id: "3",
      accessibilityScore: 2.5,
      timeMinutes: 10,
      wheelChairAccessible: false,
    },
  ];
};

export default async function SearchResults({
  searchParams: { location },
}: {
  searchParams: { location?: string };
}) {
  if (!location) {
    return null;
  }

  const results = await fetchResults(location);
  const highestScore = Math.max(
    ...results.map((result) => result.accessibilityScore),
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between px-8 py-24">
      <Search className="fixed top-4 z-10" location={location} backButton />
      <ul className="z-10 w-full space-y-6">
        {results.map((result) => (
          <li
            key={result.id}
            className="relative flex gap-2 rounded-md border bg-background/80 p-4"
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
                {result.wheelChairAccessible && (
                  <AccessibilityIcon className="h-4 w-4" />
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <MainMap />
      <ModeToggle className="fixed bottom-12 right-4 z-10" />
    </main>
  );
}
