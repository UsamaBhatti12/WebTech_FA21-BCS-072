
// insert documents in the mongodb collection (document injector)

const { MongoClient } = require('mongodb');

async function insertAppointments() {
  const uri = 'mongodb://localhost:27017'; //  MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('clientreviews');
    const collection = database.collection('appointments');

    const documents = Array.from({ length: 20 }, (_, index) => ({
      name: "Usama Bhatti",
      email: "sfdsdfsdf@gmail.com",
      phone: "244224342",
      date: new Date("2024-05-26"),
      time: "13:15",
      nature: "rsdfgdfsd",
      comments: "ssdsfd",
      confirmed: true
    }));

    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

insertAppointments().catch(console.dir);
