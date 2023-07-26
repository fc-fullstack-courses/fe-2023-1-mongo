/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Create
// створення одного запису (також створює таблицю якщо її немає)
db.users.insertOne({ email: 'asdsadsada' });

// створення багатьох записів
db.users.insertMany([
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
]);

db.users.insertOne({
  name: 'user 3',
  address: {
    country: 'UA',
    city: 'ZP',
  },
});

db.inventory.insertMany([
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A',
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
  },
]);

// Read
db.inventory.find(); // SELECT * FROM inventory

// SELECT * FROM inventory WHERE status = 'A'
db.inventory.find({ status: 'A' });

// SELECT * FROM inventory WHERE qty > 48
db.inventory.find({ qty: { $gt: 48 } });

// SELECT * FROM inventory WHERE size.uom = 'in'
db.inventory.find({ 'size.uom': 'in' });

// SELECT * FROM inventory WHERE size.uom = 'in' AND status = 'A' AND qty > 48
db.inventory.find({ 'size.uom': 'in', status: 'A', qty: { $gt: 48 } });

// SELECT * FROM inventory WHERE (status = A) OR size.h > 15
db.inventory.find({ $or: [{ status: 'A' }, { 'size.h': { $gt: 15 } }] });

db.users.find();

// всі користувачі у кого є емейл
db.users.find({ email: { $exists: true } });
db.users.find({ email: { $exists: 1 } }); // true
db.users.find({ email: { $exists: 0 } }); // false

// 1. h > 9 , w <= 20
db.inventory.find({ 'size.h': { $gt: 9 }, 'size.w': { $lte: 20 } });
// 2. uom = 'cm', qty < 70
db.inventory.find({ $and: [{ 'size.uom': 'cm' }, { qty: { $lt: 70 } }] });
