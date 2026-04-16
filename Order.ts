class Order {
  public customerName: string;
  private orderId: string;
  private amount: number;
  private isDelivered: boolean;

  constructor(customerName: string, orderId: string, amount: number = 0) {
    this.customerName = customerName;
    this.orderId = orderId;
    this.amount = amount;
    this.isDelivered = false;
  }

  // (a) Getters
  getOrderId(): string {
    return this.orderId;
  }

  getAmount(): number {
    return this.amount;
  }

  getDeliveryStatus(): boolean {
    return this.isDelivered;
  }

  // (b) Method Overloading - addAmount
  addAmount(value: number): void;
  addAmount(value: number, note: string): void;
  addAmount(value: number, note?: string): void {
    this.amount += value;
    if (note !== undefined) {
      console.log(`Added $${value.toFixed(2)}: ${note}`);
    } else {
      console.log(`Added $${value.toFixed(2)} to order ${this.orderId}`);
    }
  }

  // (c) Additional Methods
  markAsDelivered(): void {
    this.isDelivered = true;
    console.log(`Order ${this.orderId} marked as delivered for ${this.customerName}`);
  }

  applyDiscount(percent: number): void {
    if (percent > 0 && percent <= 100) {
      const discount = this.amount * (percent / 100);
      this.amount -= discount;
      console.log(`Applied ${percent}% discount ($${discount.toFixed(2)}) to order ${this.orderId}. New total: $${this.amount.toFixed(2)}`);
    } else {
      console.log('Invalid discount percentage');
    }
  }

  // (d) toString
  toString(): string {
    return `Order[name=${this.customerName}, id=${this.orderId}, amount=$${this.amount.toFixed(2)}, delivered=${this.isDelivered}]`;
  }
}

// (e) Main Usage & Logic
function main() {
  console.log('=== Online Food Order System ===');

  // Create 3 Order objects
  const orders: Order[] = [
    new Order('Riya', '101', 500),
    new Order('Amit', '102', 750),
    new Order('Priya', '103', 1200)
  ];

  // Perform operations
  console.log('\n1. Adding amounts (overloaded methods):');
  orders[0].addAmount(150);  // Without note
  orders[0].addAmount(75, 'Extra fries');  // With note
  
  orders[1].addAmount(100, 'Dessert added');
  
  orders[2].addAmount(200);

  // Apply discount
  console.log('\n2. Applying discount:');
  orders[1].applyDiscount(10);  // 10% discount on Amit's order

  // Mark delivered
  console.log('\n3. Marking delivered:');
  orders[0].markAsDelivered();

  // Print all orders
  console.log('\n4. All Orders:');
  orders.forEach((order, index) => {
    console.log(`${index + 1}. ${order.toString()}`);
  });

  // Find highest amount order
  const highestAmountOrder = orders.reduce((highest, current) => 
    current.getAmount() > highest.getAmount() ? current : highest
  );
  console.log(`\n5. Highest Amount Order: ${highestAmountOrder.toString()}`);

  // Count delivered orders
  const deliveredCount = orders.filter(order => order.getDeliveryStatus()).length;
  console.log(`6. Delivered Orders Count: ${deliveredCount}/${orders.length}`);

  console.log('\n=== System Complete ===');
}

// Run main
main();

