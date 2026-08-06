import type { Metadata } from "next";
import localFont from "next/font/local";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const mamsDisplay = localFont({
  src: "../../public/fonts/Logotype.otf",
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const artegraSans = localFont({
  src: "../../public/fonts/ArtegraSans-SemiBold.otf",
  variable: "--font-heading",
  display: "swap",
  weight: "600",
  preload: true,
});

const outfit = localFont({
  src: "../../public/fonts/Outfit-Variable.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grupotextilmams.com"),
  title: {
    default: "MAMS Grupo Textil — Confeccionamos tus ideas",
    template: "%s | MAMS Grupo Textil",
  },
  description:
    "Aliado textil en Guarne, Colombia. Del boceto al anaquel: diseño, tejido seamless, teñido, confección y empaque bajo un mismo techo.",
  keywords: [
    "textil Colombia",
    "manufactura textil",
    "seamless",
    "marca privada",
    "confección",
    "MAMS",
    "Guarne",
    "Antioquia",
    "paquete completo textil",
    "teñido industrial",
  ],
  authors: [{ name: "MAMS Grupo Textil" }],
  creator: "MAMS Grupo Textil",
  openGraph: {
    title: "MAMS Grupo Textil — Confeccionamos tus ideas",
    description:
      "Del boceto al anaquel bajo un mismo techo. Velocidad, escala y control para tu marca — sin costuras entre procesos.",
    type: "website",
    locale: "es_CO",
    siteName: "MAMS Grupo Textil",
    url: "https://grupotextilmams.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAMS Grupo Textil — Confeccionamos tus ideas",
    description:
      "Del boceto al anaquel bajo un mismo techo. Velocidad, escala y control para tu marca.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://grupotextilmams.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${mamsDisplay.variable} ${artegraSans.variable} ${outfit.variable}`}
    >
      <body>
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-mams-blue focus:text-mams-cream focus:px-4 focus:py-2"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
