db.createCollection('manufacturers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['brandName'],
      properties: {
        brandName: {
          bsonType: 'string',
          description: 'Brand name must be string',
        },
        address: {
          bsonType: 'string',
          description: 'Invalid adress',
        },
        email: {
          bsonType: 'string',
          pattern: '[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]',
          description: 'Invalid email',
        },
      },
    },
  },
});

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'manufacturerId'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Invalid name',
        },
        price: {
          bsonType: 'number',
          minimum: 0,
          maximum: 150000,
          description: 'Invalid price',
        },
        quantity: {
          bsonType: 'int',
          minimum: 0,
          description: 'cannot be less than 0',
        },
        manufacturerId: {
          bsonType: 'objectId',
        },
      },
    },
  },
});

db.manufacturers.insertMany([
  { brandName: 'Apple', address: 'New York', email: 'apple@gmail.com' },
  { brandName: 'Samsung', address: 'Seol', email: 'samsung@gmail.com' },
  { brandName: 'Xiaomi', address: 'Tokio', email: 'xiaomi@gmail.com' },
  { brandName: 'LG', address: 'Beijing', email: 'lgcomp@gmail.com' },
  { brandName: 'Motorolla', address: 'Berlin', email: 'motorolla@gmail.com' },
  { brandName: 'Intel', address: 'Paris', email: 'intel@gmail.com' },
  { brandName: 'MSI', address: 'Kiyv', email: 'msi@gmail.com' },
]);

db.products.insertMany([
  {
    name: 'IPhone XLVI',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8ec'),
    price: 47999.99,
    quantity: 2500,
  },
  {
    name: 'IPhone XLVI Max',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8ec'),
    price: 77999.99,
    quantity: 5000,
  },
  {
    name: 'Galaxy Note 999',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8ed'),
    price: 39999.99,
    quantity: 1000,
  },
  {
    name: 'Redmi 5000',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8ec'),
    price: 38999.99,
    quantity: 50000,
  },
  {
    name: 'Moto G900 Plus',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8f0'),
    price: 25000,
    quantity: 34178,
  },
  {
    name: 'Intel Core i9-20999',
    manufacturerId: new ObjectId('64c291ae49e8a1c04f8fc8f1'),
    price: 20999.99,
    quantity: 287,
  },
]);
