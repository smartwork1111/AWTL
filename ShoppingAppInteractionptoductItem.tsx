import React from "react";
import { Product } from "./types";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<Props> = ({ product, onDelete, onAddToCart }) => {

  const handleView = () => {
    alert(`Product: ${product.name}`);
  };

  return (
    <div>
      <span>{product.name}</span>

      <button onClick={handleView}>View</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
