import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "systemprompts | A database of verified LLM system prompts",
  description: "Explore system prompts from top AI coding assistants and tools including Cursor, Claude Code, v0, Lovable, Devin, and more.",
  keywords: ["AI prompts", "system prompts", "LLM prompts", "AI coding", "Cursor", "Claude", "GPT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased noise-overlay">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
