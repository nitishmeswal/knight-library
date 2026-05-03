import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GSAP + Three.js Template",
  description:
    "Template for scroll-triggered GSAP animations with a Three.js stage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-display">{children}</body>
    </html>
  );
}
