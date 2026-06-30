import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CartProvider } from "@/components/providers/cart-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON — Modern Fashion House",
  description:
    "MAISON is a luxury fashion house. Discover premium, minimal, and timeless pieces crafted with extraordinary detail.",
  keywords: ["fashion", "luxury", "clothing", "premium", "minimal", "store"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen antialiased`}
      >
        <Script id="maison-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('maison-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <CartProvider>
            <SmoothScroll>
              <ScrollProgress />
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
