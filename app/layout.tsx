// app/layout.tsx (server component by default)
import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};


export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode,
  session:any
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RootLayoutClient session={session}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
