import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0c",
};

export const metadata: Metadata = {
  title: "MELTED | Financial Engineer",
  description: "Exploring systems at their edges. Security, AI, and the decentralized future.",
  metadataBase: new URL("https://meltedmindz.com"),
  openGraph: {
    title: "MELTED | Financial Engineer",
    description: "Exploring systems at their edges. Security, AI, and the decentralized future.",
    type: "website",
    url: "https://meltedmindz.com",
    siteName: "MELTED",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MELTED - Financial Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MeltedMindz",
    title: "MELTED | Financial Engineer",
    description: "Exploring systems at their edges. Security, AI, and the decentralized future.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
