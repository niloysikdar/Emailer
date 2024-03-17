import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/sidebar";
import { TopTitleBar } from "@/components/top-titlebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Emailer | Dashboard",
  description: "An app to manage, send and track emails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <main className="flex min-w-full min-h-dvh">
          <Sidebar />
          <div className="flex-grow">
            <TopTitleBar />
            <div className="w-full pt-24 pb-8 px-8 pl-72 min-h-dvh">
              {children}
            </div>
          </div>
        </main>

        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
