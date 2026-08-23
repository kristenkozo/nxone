import { Header } from "@/components/header";
import { AppGrid } from "@/components/app-grid";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl">
      <Header />
      <main className="mt-4">
        <AppGrid />
      </main>
    </div>
  );
}
