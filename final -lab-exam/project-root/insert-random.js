const { MongoClient } = require('mongodb');

async function generateSampleRecords() {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('clientreviews');
    const collection = database.collection('appointments');

    const sampleRecords = [];

    for (let i = 0; i < 20; i++) {
      const record = {
        name: `Name ${i + 1}`,
        email: `email${i + 1}@example.com`,
        phone: `123456789${i}`,
        date: new Date(`2024-05-${i + 1}`),
        time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        nature: `Nature ${i + 1}`,
        comments: `Comments ${i + 1}`,
        confirmed: i % 2 === 0 // Alternating between true and false
      };
      sampleRecords.push(record);
    }

    const result = await collection.insertMany(sampleRecords);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

generateSampleRecords().catch(console.error);
