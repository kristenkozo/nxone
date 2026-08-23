import { Header } from "@/components/header";
import { AppGrid } from "@/components/app-grid";
import { LinkGrid } from "@/components/link-grid";

export default function LauncherPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl">
      <Header />
      <main className="mt-4">
        <AppGrid />
        <LinkGrid />
      </main>
    </div>
  );
}
