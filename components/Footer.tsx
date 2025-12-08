export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#eee",
        padding: "1rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#555",
      }}
    >
      © {new Date().getFullYear()} Ecommerce. Todos os direitos reservados.
    </footer>
  );
}
