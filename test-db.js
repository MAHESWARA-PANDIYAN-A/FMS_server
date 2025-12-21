import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        console.log('Testing MongoDB connection...');
        console.log('MongoDB URL:', process.env.MONGODB_URL);
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Database connected successfully');
        
        // Test creating a user
        const testSchema = new mongoose.Schema({
            name: String,
            email: String
        });
        
        const TestModel = mongoose.model('test', testSchema);
        const testDoc = new TestModel({ name: 'test', email: 'test@test.com' });
        await testDoc.save();
        console.log('✅ Test document created');
        
        await TestModel.deleteOne({ name: 'test' });
        console.log('✅ Test document deleted');
        
        await mongoose.disconnect();
        console.log('✅ Database disconnected');
        
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
};

testConnection();