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

// Update
db.inventory.insertMany( [
  { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
  { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
  { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
  { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
  { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
  { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
  { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
  { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
] );

// один запис - updateOne
// багато записів - updateMany

// UPDATE inventory SET status = "Accepted" WHERE status = 'A'
db.inventory.updateMany({status : 'A'}, { $set: { status: 'Accepted' }});

db.inventory.find({status: 'Accepted'});

// P -> Processing
db.inventory.updateMany({status : 'P'}, { $set: { status: 'Processing' }});
// D -> Done
db.inventory.updateMany({status : 'D'}, { $set: { status: 'Done' }});

// Delete

//  deleteOne - видалити один запис
//  deleteMany - видалити кілька

db.inventory.drop() // DELETE FROM inventory;
db.inventory.deleteMany(); // DELETE FROM inventory;

// DELETE FROM users WHERE email IS NULL;
// всі документи юзерів, у яких немає емейлу
db.users.deleteMany({ email : {$exists : false}}); 