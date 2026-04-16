// 1. Interfaces
interface Product<T> {
  id: T;
  name: string;
  basePrice: number;
  category: string;
  getDiscountedPrice(discount: number): number;
}

interface PaymentMethod {
  processPayment(amount: number): Promise<boolean>;
  validatePayment(): boolean;
  getTransactionId(): string;
}

// 2. Product Classes
abstract class BaseProduct<T> implements Product<T> {
  constructor(
    public id: T,
    public name: string,
    public basePrice: number,
    public category: string
  ) {}

  abstract getDiscountedPrice(discount: number): number;
}

class ElectronicsProduct extends BaseProduct<string> {
  constructor(id: string, name: string, basePrice: number) {
    super(id, name, basePrice, 'Electronics');
  }

  getDiscountedPrice(discount: number): number {
    const maxDiscount = 0.25; // Max 25% for electronics
    const effectiveDiscount = Math.min(discount, maxDiscount);
    // Extra 5% for laptops
    const extraDiscount = this.name.toLowerCase().includes('laptop') ? 0.05 : 0;
    return this.basePrice * (1 - (effectiveDiscount + extraDiscount));
  }
}

class ClothingProduct extends BaseProduct<number> {
  constructor(id: number, name: string, basePrice: number) {
    super(id, name, basePrice, 'Clothing');
  }

  getDiscountedPrice(discount: number): number {
    const maxDiscount = 0.40; // Max 40% for clothing
    const effectiveDiscount = Math.min(discount, maxDiscount);
    // Extra discount for seasonal items
    const extraDiscount = this.name.toLowerCase().includes('winter') ? 0.10 : 0;
    return this.basePrice * (1 - (effectiveDiscount + extraDiscount));
  }
}

// 3. Generic Inventory
class Inventory<T extends Product<any>> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
    console.log(`Added to inventory: ${item.name}`);
  }

  removeItem(id: string): boolean {
    const index = this.items.findIndex(item => String(item.id) === id);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`Removed from inventory: ${id}`);
      return true;
    }
    return false;
  }

  findById(id: string): T | undefined {
    return this.items.find(item => String(item.id) === id);
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}

// 4. Payment Classes
class CreditCardPayment implements PaymentMethod {
  private transactionId: string;
  private cardNumber: string;
  private isValid = true;

  constructor(cardNumber: string) {
    this.transactionId = `CC-${Math.random().toString(36).substr(2, 9)}`;
    this.cardNumber = cardNumber.slice(-4); // Store last 4 digits
  }

  validatePayment(): boolean {
    return this.isValid && this.cardNumber.length >= 4;
  }

  async processPayment(amount: number): Promise<boolean> {
    console.log(`Processing credit card payment: ****${this.cardNumber} for $${amount.toFixed(2)}`);
    
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (Math.random() > 0.1) { // 90% success rate
      console.log(`Credit card payment successful. Transaction ID: ${this.transactionId}`);
      return true;
    } else {
      console.log('Credit card payment failed');
      return false;
    }
  }

  getTransactionId(): string {
    return this.transactionId;
  }
}

class PayPalPayment implements PaymentMethod {
  private transactionId: string;

  constructor() {
    this.transactionId = `PP-${Math.random().toString(36).substr(2, 9)}`;
  }

  validatePayment(): boolean {
    return true; // PayPal always valid
  }

  async processPayment(amount: number): Promise<boolean> {
    console.log(`Processing PayPal payment for $${amount.toFixed(2)}`);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (Math.random() > 0.05) { // 95% success
      console.log(`PayPal payment successful. Transaction ID: ${this.transactionId}`);
      return true;
    }
    console.log('PayPal payment failed');
    return false;
  }

  getTransactionId(): string {
    return this.transactionId;
  }
}

// 5. Order System
class Order {
  private products: { product: Product<any>; quantity: number }[] = [];
  private paymentMethod: PaymentMethod;

  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  addProduct(product: Product<any>, quantity: number = 1): void {
    this.products.push({ product, quantity });
    console.log(`Added ${quantity}x ${product.name} to order`);
  }

  calculateSubtotal(): number {
    return this.products.reduce((total, item) => {
      return total + (item.product.getDiscountedPrice(0.15) * item.quantity); // 15% cart discount
    }, 0);
  }

  async checkout(): Promise<{ success: boolean; transactionId: string }> {
    if (!this.paymentMethod.validatePayment()) {
      return { success: false, transactionId: '' };
    }

    const subtotal = this.calculateSubtotal();
    console.log(`\n=== CHECKOUT ===`);
    console.log(`Order subtotal (15% discount): $${subtotal.toFixed(2)}`);

    const success = await this.paymentMethod.processPayment(subtotal);
    console.log(`Order ${success ? 'completed' : 'failed'}`);
    
    return { 
      success, 
      transactionId: success ? this.paymentMethod.getTransactionId() : '' 
    };
  }
}

// Demo Usage
async function demo() {
  console.log('🚀 E-Commerce System Demo\n');

  // Inventory setup
  const inventory = new Inventory<Product<any>>();
  const laptop = new ElectronicsProduct('LAP001', 'Gaming Laptop', 1200);
  const jacket = new ClothingProduct(1, 'Winter Jacket', 89.99);
  
  inventory.addItem(laptop);
  inventory.addItem(jacket);

  console.log('\nInventory:', inventory.getAllItems().map(p => `${p.name} ($${p.basePrice})`));

  // Order
  const creditCard = new CreditCardPayment('4532015112830366');
  const order = new Order(creditCard);
  
  order.addProduct(laptop, 1);
  order.addProduct(jacket, 2);

  const result = await order.checkout();
  console.log(`\nFinal Result: ${result.success ? '✅ SUCCESS' : '❌ FAILED'} | TXN: ${result.transactionId}`);

  // Test PayPal
  console.log('\n--- PayPal Test ---');
  const paypalOrder = new Order(new PayPalPayment());
  paypalOrder.addProduct(inventory.findById('LAP001')!, 1);
  const paypalResult = await paypalOrder.checkout();
  console.log(`PayPal: ${paypalResult.success ? '✅ SUCCESS' : '❌ FAILED'}`);
}

demo().catch(console.error);

