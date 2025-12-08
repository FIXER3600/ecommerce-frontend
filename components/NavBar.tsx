"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import { usePathname } from "next/navigation";


export default function Navbar() {
 const [role, setRole] = useState<"SELLER" | "CLIENT" | null>(null);
const pathName = usePathname();

  useEffect(() => {
   const storedRole = localStorage.getItem("role");
  if (storedRole === "SELLER" || storedRole === "CLIENT") {
    setRole(storedRole); 
  } else {
    setRole(null);
  }

  }, []);
const mostrarNav = pathName !== "/auth/signin" && pathName !== "/auth/signup";

 return (
    <nav
      style={{
        backgroundColor: "#189A52",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}
    >
       {mostrarNav && (
        <>
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration:"none", color:"#fff", fontSize:"20px", fontWeight:"bold" }}>
        <img
          src="/logo.jpg"
          alt="Logo"
          width={40}
          height={40}
        />
        <span style={{ marginLeft: "0.5rem", fontWeight: "bold" }}>Ecommerce</span>
      </Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        {role === "CLIENT" && (
          <>
            <Link href="/cart" style={{  textDecoration: "none", color: "#fff" }}>
              Carrinho
            </Link>
            <Link href="/orders" style={{  textDecoration: "none", color: "#fff" }}>
              Pedidos
            </Link>
            <Link href="/favorites" style={{  textDecoration: "none", color: "#fff" }}>
              Favoritos
            </Link>
          </>
        )}
        {role === "SELLER" && (
          <>
            <Link href="/seller" style={{  textDecoration: "none", color: "#fff" }}>
              Dashboard
            </Link>
            <Link href="/products" style={{  textDecoration: "none",color: "#fff" } }>
              Criar Produto
            </Link>
          </>
        )}
      </div>
      <AccountMenu role={role} /> 
      </>
      )}
      
    </nav>
      
      
  );

}
