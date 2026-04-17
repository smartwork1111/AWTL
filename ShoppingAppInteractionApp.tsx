import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { Product } from "./types";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "📱 Phone" },
    { id: 2, name: "💻 Laptop" },
    { id: 3, name: "🎧 Headphones" },
  ]);

  const [cart, setCart] = useState<Product[]>([]);

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Shopping App</h1>

      <h2>Products</h2>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
        />
      ))}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      )}
    </div>
  );
};

export default App;
