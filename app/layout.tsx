import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "./toast-provider";

export const metadata: Metadata = {
  title: "homeio",
  description: "A calmer way to care for your home.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ToastProvider /></body></html>;
}
