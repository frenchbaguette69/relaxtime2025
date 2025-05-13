import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="nl" className="relative">
      <body className={twMerge(dmSans.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
