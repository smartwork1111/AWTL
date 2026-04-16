import React, { useState } from "react";

// Product Type
interface Product {
  id: number;
  name: string;
}

// Child Component
type ProductItemProps = {
  product: Product;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onAddToCart }) => {
  
  const handleView = () => {
    alert(`Product: ${product.name}`);
  };

  return (
    <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>{product.name}</h3>

      <button onClick={handleView} style={{ margin: "5px", padding: "8px 12px" }}>View</button>

      <button onClick={() => onDelete(product.id)} style={{ margin: "5px", padding: "8px 12px", background: "#ff4444", color: "white" }}>
        Delete
      </button>

      <button onClick={() => onAddToCart(product)} style={{ margin: "5px", padding: "8px 12px", background: "#4CAF50", color: "white" }}>
        Add to Cart
      </button>
    </div>
  );
};

// Parent Component
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
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🛒 Shopping App</h1>

      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map(p => (
          <ProductItem
            key={p.id}
            product={p}
            onDelete={handleDelete}
            onAddToCart={handleAddToCart}
          />
        ))
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2>🛍️ Cart ({cart.length} items)</h2>
      {cart.length === 0 ? (
        <p>No items in cart yet.</p>
      ) : (
        <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", display: "inline-block", textAlign: "left" }}>
          {cart.map(item => (
            <p key={item.id}>
              • {item.name} 
              <span style={{ float: "right", color: "#666" }}>
                (ID: {item.id})
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
