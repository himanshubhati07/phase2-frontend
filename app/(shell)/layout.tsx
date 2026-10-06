import { AuthGate } from "@/components/AuthGate";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate><div className="min-h-screen bg-canvas lg:flex"><Sidebar /><div className="min-w-0 flex-1"><TopBar /><main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">{children}</main></div></div></AuthGate>;
}
