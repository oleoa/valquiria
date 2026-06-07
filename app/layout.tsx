import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./styles.css";

// Tipografia: Cormorant Garamond (serifa elegante) para headlines / Inter para corpo.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valquiriaabreu.com"),
  title: "Valquiria Abreu — Tutoria Comportamental para suas Mentoradas",
  description:
    "A parceira que sustenta as suas mentoradas onde a sua mentoria já fez o que tinha de fazer. Tutoria comportamental mensal, com teste de personalidade individual, encontros ao vivo e suporte direto no WhatsApp.",
  openGraph: {
    title: "Valquiria Abreu — Tutoria Comportamental para suas Mentoradas",
    description:
      "A parceira que sustenta as suas mentoradas onde a sua mentoria já fez o que tinha de fazer. Tutoria comportamental mensal, com teste de personalidade individual.",
    url: "/",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 1200,
        alt: "Valquiria Abreu — Tutoria Comportamental",
      },
    ],
  },
  icons: {
    icon: "/logo-ico.ico",
    shortcut: "/logo-ico.ico",
  },
};

export default function ValquiriaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`va-root ${cormorant.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
