import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { AuthProvider } from "@/provider/authProvider";
import ReduxProvider from "@/provider/reduxProvider";
import Cookies from "js-cookie";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompostLink",
  description: "Save the planet, compost your food waste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChakraProvider>
          <AuthProvider>
            <ReduxProvider token={Cookies.get("access_token") || ""}>
              {children}
            </ReduxProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
