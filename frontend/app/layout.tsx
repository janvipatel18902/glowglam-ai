import "./globals.css";

export const metadata = {
  title: "GlowGlam AI",
  description: "Smart skincare analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
