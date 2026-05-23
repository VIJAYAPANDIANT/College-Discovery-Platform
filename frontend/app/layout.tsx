import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CompareDrawer from "@/components/CompareDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniScope | Discover & Compare Top Colleges",
  description: "Find the best colleges, compare tuition fees, ratings, placement rates, and read authentic student reviews to choose your dream campus.",
  keywords: ["college discovery", "university finder", "compare colleges", "higher education", "placement rates", "tuition fees"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem("colleges_data_fixed_v1") !== "true") {
                  localStorage.removeItem("colleges_data");
                  localStorage.setItem("colleges_data_fixed_v1", "true");
                }
              } catch (e) {
                console.error("Local storage cache clear failed:", e);
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <CompareDrawer />
          <footer className="border-t border-border bg-card/50 py-8 text-center text-sm text-muted-foreground">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg">UniScope</div>
              <p>© {new Date().getFullYear()} UniScope. All rights reserved. Connecting students with their future.</p>
              <div className="flex gap-4 text-xs font-medium">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Contact Support</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
