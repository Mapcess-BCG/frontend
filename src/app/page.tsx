import { MainMap } from "@/components/main-map";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <Search className="z-10" />
      <MainMap />
      <ModeToggle className="z-10" />
    </main>
  );
}
