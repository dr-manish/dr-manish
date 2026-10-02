import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | Dr. Manish Kumar",
    default: "Dr. Manish Kumar Home Page",
  },
  description: "Academic Portfolio of Dr. Manish Kumar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="container">
          <Header />
          <div id="main">
            <Sidebar />
            <div id="rightcol">
              {children}
            </div>
          </div>
          <div id="footer">
            &copy; {new Date().getFullYear()} | Last Updated {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </body>
    </html>
  );
}
