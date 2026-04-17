class Order {
  public customerName: string;
  private orderId: string;
  private amount: number;
  private isDelivered: boolean;

  // ✅ Constructor
  constructor(customerName: string, orderId: string, amount: number) {
    this.customerName = customerName;
    this.orderId = orderId;
    this.amount = amount;
    this.isDelivered = false;
  }

  // ✅ Getters
  getOrderId(): string {
    return this.orderId;
  }

  getAmount(): number {
    return this.amount;
  }

  getDeliveryStatus(): boolean {
    return this.isDelivered;
  }

  // ✅ Method Overloading
  addAmount(value: number): void;
  addAmount(value: number, note: string): void;
  addAmount(value: number, note?: string): void {
    this.amount += value;
    if (note) {
      console.log(`Note: ${note}`);
    }
  }

  // ✅ Mark as delivered
  markAsDelivered(): void {
    this.isDelivered = true;
  }

  // ✅ Apply discount
  applyDiscount(percent: number): void {
    const discount = (this.amount * percent) / 100;
    this.amount -= discount;
  }

  // ✅ toString method
  toString(): string {
    return `Order[name=${this.customerName}, id=${this.orderId}, amount=${this.amount}, delivered=${this.isDelivered}]`;
  }
}

// ==========================
// ✅ Main Section
// ==========================

const order1 = new Order("Riya", "101", 500);
const order2 = new Order("Aman", "102", 800);
const order3 = new Order("Neha", "103", 300);

// ✅ Add amount
order1.addAmount(100);
order2.addAmount(200, "Extra items added");

// ✅ Apply discount
order2.applyDiscount(10);

// ✅ Mark delivered
order1.markAsDelivered();

// ✅ Print all orders
const orders: Order[] = [order1, order2, order3];

console.log("\nAll Orders:");
orders.forEach(order => console.log(order.toString()));

// ✅ Find highest amount order
let highestOrder = orders[0];

for (let order of orders) {
  if (order.getAmount() > highestOrder.getAmount()) {
    highestOrder = order;
  }
}

console.log("\nHighest Amount Order:");
console.log(highestOrder.toString());

// ✅ Count delivered orders
const deliveredCount = orders.filter(order =>
  order.getDeliveryStatus()
).length;

console.log(`\nDelivered Orders Count: ${deliveredCount}`);



//npm install -g typescript ts-node
//ts-node foodorder.ts
//tsc order.ts
//node order.js
