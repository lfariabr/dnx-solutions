// check-user-mongo.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkUser() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dnx-solutions';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const user = await db.collection('users').findOne({ email: 'luis@luis.com' });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('Current user:', { 
      email: user.email, 
      role: user.role,
      name: user.name 
    });
    
    // Uncomment to update role to ADMIN
    // await db.collection('users').updateOne(
    //   { _id: user._id },
    //   { $set: { role: 'ADMIN' } }
    // );
    // console.log('User role updated to ADMIN');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkUser();