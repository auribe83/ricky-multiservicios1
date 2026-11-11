import type { Metadata } from "next";
import "./globals.css";
import "./typography.css";

export const metadata: Metadata = {
  title: "Ricky Multiservicios | Caracas",
  description: "Mantenimiento y reparaciones para hogares, condominios y locales comerciales en Caracas."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
