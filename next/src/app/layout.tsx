import "modern-normalize/modern-normalize.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
