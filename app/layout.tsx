import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Spa 1 | Premium Window Tinting & Auto Detailing | Westland, MI",
  description: "Auto Spa 1 offers premium window tinting, ceramic coating, paint protection, and auto detailing services in Westland, MI. Transform your vehicle with our expert care.",
  keywords: "auto detailing, window tinting, ceramic coating, paint protection, car detailing, Westland MI, Auto Spa 1",
  icons: {
    icon: "/logo.avif",
    apple: "/logo-old.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
