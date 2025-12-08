import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Ecommerce",
  description: "Frontend para o backend de ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
          color: "#333",
        }}
      >
        <Navbar />
        <main style={{ minHeight: "80vh", padding: "2rem" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
