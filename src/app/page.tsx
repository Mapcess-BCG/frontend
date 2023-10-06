import { MainMap } from "@/components/main-map";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <Search className="fixed top-4 z-10" />
      <MainMap />
      <ModeToggle className="fixed bottom-12 right-4 z-10" />
    </main>
  );
}
