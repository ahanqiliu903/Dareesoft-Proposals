import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Municipality Tracker — Dareesoft",
  description:
    "U.S. municipality outreach tracker for Dareesoft East Coast market entry.",
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
