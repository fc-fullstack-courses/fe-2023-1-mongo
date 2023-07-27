db.createCollection('movies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'yearOfRelease'],
      properties: {
        title: {
          bsonType: 'string',
          pattern: '[A-Z][a-z]{0,32}',
          description: 'Title must be in English',
        },
        yearOfRelease: {
          bsonType: 'int',
          maximum: 2030,
          minimum: 1900,
          description: 'Year of release must be in range 1900 - 2030',
        },
        movieMaker: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string',
            },
            address: {
              bsonType: 'string',
            },
          },
        },
      },
    },
  },
});


db.movies.insertMany([
  {
    title: "Movieone",
    yearOfRelease: 2017
  },
  {
    title: "Movietwo",
    yearOfRelease: 2019
  },
  {
    title: "Thebestmovie",
    yearOfRelease: 2021,
    movieMaker: {
      name: "Hollywood",
      address: "Somewhere in USA"
    }
  },
]);

db.movies.insertOne({
  title: 'Test',
  yearOfRelease: 2020
})

db.movies.insertOne({data: 'test'});
db.movies.insertOne({title: 'Test',});
db.movies.insertOne({title: 'Test',yearOfRelease: 33500});
db.movies.insertOne({title: 'Test',yearOfRelease: 2014,movieMaker : {} });

/*
  Створити дві таблички з валідацією

  Таблиця 1 - Виробники
  має мати поля:
    - назва виробника
    - адреса виробника
    - email
  Поле назви має бути обов'язковим

  Таблиця 2 - Товари
  має мати поля:
    - назва
    - ціна
    - кількість на складі
    - виробник (objectId)
  Мають завжди бути поля
    - назва
    - виробник

  db.insertMany([
    {
      name: '123sadsadsa',
      price: 2334232,
      amount: 21323,
      manufacturerId : new ObjectId('64c001c4e0d5cbef4365eb7f')
    }
  ])
*/