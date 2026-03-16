import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayesha Shahid | AI Engineer & Architect",
  description: "Specializing in high-performance RAG pipelines, autonomous AI agents, and production-scale backend systems. Explore my portfolio of cinematic, scrollytelling experiences.",
  keywords: ["AI Engineer", "Software Architect", "RAG Pipelines", "Autonomous Agents", "Next.js Portfolio", "Ayesha Shahid", "FastAPI Expert", "Machine Learning Portfolio"],
  authors: [{ name: "Ayesha Shahid" }],
  creator: "Ayesha Shahid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayeshashahid.com", // User should update this to their actual domain
    title: "Ayesha Shahid | AI Engineer & Architect",
    description: "High-performance AI Engineering portfolio featuring advanced RAG and autonomous agent implementations.",
    siteName: "Ayesha Shahid Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Shahid | AI Engineer & Architect",
    description: "High-performance AI Engineering portfolio featuring advanced RAG and autonomous agent implementations.",
    creator: "@AyeshaShahid", // User can update this
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${syne.variable} ${playfair.variable} font-sans antialiased text-white bg-[#121212] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
