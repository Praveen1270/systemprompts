import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SystemPrompts | A database of verified LLM system prompts",
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DC4QYX4SH1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DC4QYX4SH1');
          `}
        </Script>
        {/* GoatCounter Analytics */}
        <Script
          data-goatcounter="https://praveen.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
