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
/*
{
  $lookup:
    {
      from: <collection to join>,
      localField: <field from the input documents>,
      foreignField: <field from the documents of the "from" collection>,
      as: <output array field>
    }
}
*/

// Отримати дані про кожен з продуктів з їх виробником
db.products.aggregate([
  {
    // LEFT JOIN
    $lookup: {
      from: 'manufacturers', // назву таблиці яку треба джоініти
      localField: 'manufacturerId', // поле з початкової таблиці
      foreignField: '_id', // поле з під'єднуємої таблиці
      as: 'manufacturer', // назву поля, в яке буде вставлено масив з результатами джоіну
    },
  },
  {
    // Розбирає масив, і створює по запису для кожного елемента масиву
    $unwind: '$manufacturer',
  },
  {
    // прибирає вказане поле або поля, якщо передати масиз з ії назвами
    $unset: 'manufacturerId',
  },
]);

// кількість унікальних товарів для кожного виробника

db.manufacturers.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'manufacturerId',
      as: 'product',
    },
  },
  {
    $unset: 'product.manufacturerId',
  },
  {
    $unwind: '$product',
  },
  // {
  //   $group: {
  //     _id: "$brandName",
  //     totalProducts: {
  //       $count: {}
  //     }
  //   }
  // }
  {
    $group: {
      _id: '$brandName',
      totalProducts: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
  {
    $skip: 0, // OFFSET
  },
  {
    $limit: 4, // LIMIT
  },
]);

/*
  Створити коллекції Компаній та Співробітників

  - порахувати всіх співробітників кожної компанії

  - отримати одну компанію та всіх її співробітників ($match)
*/

db.createCollection('companies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string'
        }
      }
    }
  }
});

db.createCollection('workers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['fullName', 'companyId'],
      properties: {
        fullName: {
          bsonType: 'string'
        },
        companyId: {
          bsonType: 'objectId'
        }
      }
    }
  }
});

db.companies.insertMany([
  {
    name: 'MicroSoft'
  },
  {
    name: 'Apple'
  },
  {
    name: 'Google'
  },
]);

db.workers.insertMany([
  {
    fullName: 'Worker 1',
    companyId: new ObjectId("64c2a82b1cacc6950876a6fc")
  },
  {
    fullName: 'Worker 2',
    companyId: new ObjectId("64c2a82b1cacc6950876a6fd")
  },
  {
    fullName: 'Worker 3',
    companyId: new ObjectId("64c2a82b1cacc6950876a6fe")
  },
  {
    fullName: 'Worker 4',
    companyId: new ObjectId("64c2a82b1cacc6950876a6fd")
  },
  {
    fullName: 'Worker 5',
    companyId: new ObjectId("64c2a82b1cacc6950876a6fc")
  },
])

//  - порахувати всіх співробітників кожної компанії
db.companies.aggregate([
  {
    $lookup: {
      from: 'workers',
      localField: '_id',
      foreignField: 'companyId',
      as: 'worker'
    }
  },
  {
    $unwind: '$worker'
  },
  {
    $group: {
      _id: '$name',
      workers: {
        $count: {}
      }
    }
  }
]);

// - отримати одну компанію та всіх її співробітників ($match)
db.companies.aggregate([
  {
    $match: {
      name: "MicroSoft"
    }
  },
  {
    $lookup: {
      from: 'workers',
      localField: '_id',
      foreignField: 'companyId',
      as: 'workers'
    }
  }
])