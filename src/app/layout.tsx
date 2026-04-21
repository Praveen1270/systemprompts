import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// =============================================================================
// Site Configuration
// =============================================================================

const SITE_URL = "https://www.systemprompts.fun";
const SITE_NAME = "SystemPrompts";
const SITE_DESCRIPTION =
  "Free verified LLM system prompts from Cursor, Claude Code, v0, Lovable, Devin, Copilot, and 50+ tools. Search, compare, and learn how products instruct models.";

// =============================================================================
// Metadata
// =============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Basic metadata
  title: {
    default: `LLM System Prompts: Cursor, Claude & 50+ Tools`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "system prompts",
    "LLM system prompts",
    "AI system prompts",
    "Cursor system prompt",
    "Claude Code system prompt",
    "v0 system prompt",
    "Lovable system prompt",
    "Devin system prompt",
    "AI coding assistant prompts",
    "AI prompt database",
    "AI code editor prompts",
    "ChatGPT system prompt",
    "Gemini system prompt",
  ],
  
  // Authors and creator
  authors: [{ name: "Praveen Thotakur", url: "https://twitter.com/Praveenthotakur" }],
  creator: "Praveen Thotakur",
  publisher: SITE_NAME,
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "48x48" },
      { url: "/logo.png", type: "image/png", sizes: "96x96" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `LLM System Prompts: Cursor, Claude & 50+ Tools`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "SystemPrompts – Verified LLM system prompts from Cursor, Claude Code, v0 and more",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@Praveenthotakur",
    creator: "@Praveenthotakur",
    title: `LLM System Prompts: Cursor, Claude & 50+ Tools`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-default.png`],
  },
  
  // Alternates
  alternates: {
    canonical: SITE_URL,
  },
  
  // Category
  category: "technology",
  
  // Verification
  verification: {
    google: "17db6b42b7389378",
  },
};

// =============================================================================
// Viewport
// =============================================================================

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#f5f5f7" },
  ],
};

// =============================================================================
// Organization Schema (JSON-LD)
// =============================================================================

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 750,
    height: 750,
  },
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Praveen Thotakur",
    url: "https://twitter.com/Praveenthotakur",
  },
  sameAs: [
    "https://twitter.com/Praveenthotakur",
    "https://github.com/Praveen1270",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// =============================================================================
// Root Layout
// =============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/logo.png" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.apitiny.net" />
        <link rel="dns-prefetch" href="https://praveen.goatcounter.com" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="antialiased noise-overlay" suppressHydrationWarning>
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
        {/* Apitiny Ads */}
        <Script
          src="https://cdn.apitiny.net/scripts/v2.0/main.js"
          data-site-id="69cebf1cb584038d21b446f1"
          data-test-mode="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
