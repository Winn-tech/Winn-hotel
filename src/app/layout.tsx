import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/toastContainer";
import Navbar from "./components/navbar";
import {MainProvider} from "@/app/components/context";
import Sidebar from "./components/sidebar";
import Footer  from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "Winn-Hotels",
  title :{
    template: '%s || Winn Hotels',
    default : 'Winn Hotel'
  },
  description: "Better by far Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       <MainProvider>
           <Navbar/>
           <Sidebar/>
        <main className="sm:px-15 px-5 max-w-full">
           {children}
           <ToastProvider />
        </main>
        <Footer />
       </MainProvider>
       
      </body>
    </html>
  );
}
