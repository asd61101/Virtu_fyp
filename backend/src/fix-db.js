import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function fixDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the users collection
    const usersCollection = mongoose.connection.collection('users');
    
    // Drop the problematic index
    console.log('Dropping username index...');
    await usersCollection.dropIndex('username_1');
    console.log('Username index dropped successfully');
    
    // Create the correct index on email
    console.log('Creating email index...');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log('Email index created successfully');
    
    console.log('Database fixed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase(); 