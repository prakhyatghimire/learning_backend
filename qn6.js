const EventEmitter = require('events');

class VendingMachine extends EventEmitter {
  constructor() {
    super();
    this.products = { 
      coke: 1.50, 
      chips: 1.00, 
      candy: 0.75 
    };
    this.balance = 0;
    this.totalSales = 0;
  }
  
  insertMoney(amount) {
    if (amount <= 0) {
      this.emit('error', 'Amount must be positive');
      return;
    }
    
    this.balance += amount;
    console.log(`Inserted: $${amount.toFixed(2)}`);
    this.emit('moneyInserted', amount, this.balance);
  }
  
  selectItem(item) {
    if (!this.products[item]) {
      this.emit('error', `Invalid item: ${item}`);
      console.log(`Item "${item}" not found in machine`);
      return;
    }
    
    const price = this.products[item];
    console.log(`Selected: ${item.toUpperCase()} ($${price.toFixed(2)})`);
    
    if (this.balance >= price) {
      const change = this.balance - price;
      this.balance = 0;
      this.totalSales += price;
      
      console.log(`Dispensing ${item}...`);
      if (change > 0) {
        console.log(`Returning change: $${change.toFixed(2)}`);
      }
      
      this.emit('itemDispensed', item, change, price);
    } else {
      const short = price - this.balance;
      console.log(`Insufficient funds! Need $${short.toFixed(2)} more`);
      this.emit('insufficientFunds', item, price, this.balance);
    }
  }
  
  refund() {
    if (this.balance > 0) {
      console.log(`Refunding $${this.balance.toFixed(2)}`);
      this.emit('refund', this.balance);
      this.balance = 0;
    } else {
      console.log('No money to refund');
    }
  }
  
  checkBalance() {
    console.log(`Current balance: $${this.balance.toFixed(2)}`);
    return this.balance;
  }
  
  showProducts() {
    console.log('Available Products:');
    for (const [product, price] of Object.entries(this.products)) {
      console.log(`   ${product}: $${price.toFixed(2)}`);
    }
  }
  
  getTotalSales() {
    return this.totalSales;
  }
}

console.log('=== VENDING MACHINE SIMULATOR ===\n');

const machine = new VendingMachine();

machine.on('moneyInserted', (amount, balance) => {
  console.log(`Event: Money inserted -> New balance: $${balance.toFixed(2)}`);
});

machine.on('itemDispensed', (item, change, price) => {
  console.log(`Event: ${item.toUpperCase()} dispensed! Paid $${price.toFixed(2)}`);
  if (change > 0) {
    console.log(`Event: Change returned: $${change.toFixed(2)}`);
  }
});

machine.on('insufficientFunds', (item, price, balance) => {
  console.log(`Event: Need $${(price - balance).toFixed(2)} more for ${item}`);
});

machine.on('error', (error) => {
  console.log(`Event Error: ${error}`);
});

machine.on('refund', (amount) => {
  console.log(`Event: Refund issued: $${amount.toFixed(2)}`);
});

machine.showProducts();

console.log('\n--- SCENARIO 1: Successful Purchase ---');
machine.insertMoney(2.00);
machine.checkBalance();
machine.selectItem('coke');
machine.checkBalance();

console.log('\n--- SCENARIO 2: Multiple Insertions ---');
machine.insertMoney(1.00);
machine.insertMoney(0.50);
machine.selectItem('chips');
machine.checkBalance();

console.log('\n--- SCENARIO 3: Insufficient Funds ---');
machine.insertMoney(0.50);
machine.selectItem('candy');
machine.selectItem('candy');
machine.insertMoney(0.50);
machine.selectItem('candy');

console.log('\n--- SCENARIO 4: Refund ---');
machine.insertMoney(1.00);
machine.checkBalance();
machine.refund();
machine.checkBalance();

console.log('\n--- SCENARIO 5: Invalid Item ---');
machine.insertMoney(1.00);
machine.selectItem('burger');

console.log('\n--- SCENARIO 6: No Money ---');
machine.selectItem('coke');

console.log('\n--- SCENARIO 7: Exact Change ---');
machine.insertMoney(1.00);
machine.selectItem('chips');
machine.checkBalance();

console.log('\n=== FINAL STATISTICS ===');
console.log(`Total sales: $${machine.getTotalSales().toFixed(2)}`);
console.log(`Remaining balance in machine: $${machine.balance.toFixed(2)}`);

console.log('\n=== INTERACTIVE EXAMPLE (Simulated) ===');
const interactiveMachine = new VendingMachine();

interactiveMachine.on('itemDispensed', (item) => {
  console.log(`Enjoy your ${item}!`);
});

interactiveMachine.insertMoney(5.00);
interactiveMachine.selectItem('candy');
interactiveMachine.selectItem('chips');
interactiveMachine.selectItem('coke');
interactiveMachine.checkBalance();

interactiveMachine.refund();

console.log('\nVending Machine Demo Complete!');