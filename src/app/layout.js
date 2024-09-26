import { Roboto_Condensed } from 'next/font/google';
import Navbar from './lib/nav/page';

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
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any'/>
      </head>
      <body
        className={`${robotoCondensed.variable} antialiased`}
      >
        <Navbar />
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
