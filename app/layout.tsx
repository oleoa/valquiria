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
  title: "Valquiria Abreu — Mentora Comportamental para Mulheres",
  description:
    "Permita-se ser produtiva sem se aprisionar, realizada sem se anular. Conheça a Valquiria Abreu, mentora comportamental, e uma nova relação com o tempo, o trabalho e você mesma.",
  openGraph: {
    title: "Valquiria Abreu — Mentora Comportamental para Mulheres",
    description:
      "Uma nova relação com o tempo, com o trabalho e, principalmente, com você mesma. Conheça os caminhos da mentora comportamental Valquiria Abreu.",
    url: "/",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 1200,
        alt: "Valquiria Abreu — Mentora Comportamental",
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
