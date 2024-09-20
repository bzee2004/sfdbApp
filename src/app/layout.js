import { Roboto_Condensed } from 'next/font/google';

import "./globals.css";

export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
})

export const metadata = {
  title: "Live DB Races",
  description: "Live race results for all dragonboat races across the US",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
