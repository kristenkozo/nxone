import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-blue">
          <span className="text-lg font-bold text-white">n</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">nxOne</h1>
          <p className="text-xs text-text-faint">Nevollo Services</p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
