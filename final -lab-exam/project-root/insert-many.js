const { MongoClient } = require('mongodb');

async function insertAppointments() {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('clientreviews');
    const collection = database.collection('appointments');

    const sampleData = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123456789",
        date: new Date("2024-05-26"),
        time: "09:00",
        nature: "Consultation",
        comments: "Meeting regarding legal advice",
        confirmed: true
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "987654321",
        date: new Date("2024-05-27"),
        time: "14:30",
        nature: "Appointment",
        comments: "Discussing contract details",
        confirmed: true
      },
      // Add more sample data objects here...
    ];

    const result = await collection.insertMany(sampleData);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

insertAppointments().catch(console.dir);
