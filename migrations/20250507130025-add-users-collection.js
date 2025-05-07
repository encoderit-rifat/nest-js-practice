module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'age', 'breed'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name is required and must be a string',
            },
            age: {
              bsonType: 'int',
              description: 'Age is required and must be an integer',
            },
            breed: {
              bsonType: 'string',
              description: 'Breed is required and must be a string',
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('users').drop();
  },
};
