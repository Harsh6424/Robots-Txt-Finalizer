import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "URL Audit Tool",
  description: "Analyze URL parameters and generate robots.txt suggestions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
