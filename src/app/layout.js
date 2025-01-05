'use client';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeProvider } from "@/components/theme_provider";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar"; 
import { AuthProvider } from "./Providers";


export default function RootLayout({ children })  {
  const { theme, setTheme } = useTheme();
  
  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <head>
        <title>KAYVIKA</title>
        <link rel="icon" type="image/png" href="/pictures/kayvika.png"/>
      </head>
      <AuthProvider>
      <body className="bg-sky-500 text-foreground dark:bg-slate-800 dark:text-white">
      <ThemeProvider attribute="class" defaultTheme="system">
          <header >
            <Navbar/>
          </header>
          {children}
        </ThemeProvider>
      </body>
      </AuthProvider>
    </html>
    
  );
}
