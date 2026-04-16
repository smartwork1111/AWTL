// Define the Product interface
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// Function to return only in-stock products
function getInStockProducts(products: Product[]): Product[] {
    return products.filter(product => product.inStock);
}

// Example usage
const productList: Product[] = [
    { id: 1, name: "Laptop", price: 50000, inStock: true },
    { id: 2, name: "Mouse", price: 500, inStock: false },
    { id: 3, name: "Keyboard", price: 1500, inStock: true },
    { id: 4, name: "Monitor", price: 12000, inStock: false }
];

// Call function
const availableProducts = getInStockProducts(productList);

// Output result
console.log("Products in stock:");
console.log(availableProducts);


//npm install -g typescript
//tsc product.ts
//node product.js