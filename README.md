# 🛍️ Frontend - Ecommerce

Este é o **Frontend** do projeto de Ecommerce, desenvolvido em **Next.js** com **React** para o teste de Pessoa Desenvolvedora JR da CapLink.  
Ele fornece a interface para clientes e vendedores interagirem com a aplicação, incluindo autenticação, carrinho de compras, favoritos, pedidos e dashboard da loja.

---

## 🚀 Tecnologias utilizadas
- **Next.js 13+** (App Router, Server/Client Components)  
- **React**  
- **TypeScript**  
- **Chart.js + react-chartjs-2** (gráficos do dashboard)  
- **CSS-in-JS / Inline Styles** (estilização rápida)  
- **API Fetch personalizada (`apiFetch`)** para comunicação com o backend  

---

## 📂 Estrutura principal
- `auth/` → páginas de **SignIn** e **SignUp**  
- `cart/` → carrinho de compras com resumo lateral  
- `favorites/` → lista de favoritos com cards estilizados  
- `orders/` → pedidos do cliente  
- `products/` → criação de produto e upload via CSV  
- `dashboard/` → dashboard do vendedor com gráficos  

---

## ⚙️ Instalação e execução

### 1. Clonar o repositório
```bash
git clone https://github.com/FIXER3600/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
A aplicação estará disponível em:  
👉 `http://localhost:3000`

---

## 🔑 Configuração
- O frontend consome a API do backend (por padrão em `http://localhost:3000`).  
- O token JWT é armazenado em **localStorage** e **cookies** para autenticação.  
- Variáveis de ambiente podem ser configuradas em `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 📊 Funcionalidades
- **Autenticação**: login e cadastro com persistência de token.  
- **Carrinho**: adicionar/remover itens, limpar carrinho, checkout.  
- **Favoritos**: salvar e remover produtos favoritos.  
- **Pedidos**: histórico de compras do cliente.  
- **Dashboard do vendedor**: resumo de vendas, receita, produtos e gráficos interativos.  
- **Criação de produtos**: formulário e upload em massa via CSV.  

---

## 🎨 Padrão visual
- Cards com **box-shadow** e sem borda.  
- Paleta principal: **verde `#189A52`**.  
- Botões estilizados com hover escurecendo.  
- Layouts responsivos com grid/flex.  

---

## 📦 Build para produção
```bash
npm run build
npm run start
```