import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search-form";
import dynamic from "next/dynamic";
const MainMap = dynamic(() => import("@/components/main-map"), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <Search className="fixed top-4 z-10" />
      <MainMap />
      <ModeToggle className="fixed bottom-12 right-4 z-10" />
    </main>
  );
}
