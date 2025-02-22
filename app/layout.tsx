import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

// Load Inter font
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climora",
  description: "A weather App created by Abhishek Kumar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
