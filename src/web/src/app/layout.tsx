import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Handwriting OCR | OCR que aprende TU letra",
  description:
    "Sistema de OCR personalizado con RAG que aprende de tus correcciones. Convierte tu letra manuscrita a texto digital con alta precisión.",
  keywords: [
    "OCR",
    "handwriting",
    "manuscrita",
    "machine learning",
    "RAG",
    "personalizado",
  ],
  authors: [{ name: "Handwriting OCR Team" }],
  openGraph: {
    title: "Handwriting OCR | OCR que aprende TU letra",
    description:
      "Sistema de OCR personalizado con RAG que aprende de tus correcciones.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
