import mongoose  from "mongoose";

async function  ConnectDb(){
    try {
        const MONGO_URL=process.env.MONGO_URL;
        const db=await mongoose.connect(MONGO_URL);
        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        console.log('\nPlease check:');
        console.log('1. Your MongoDB Atlas IP whitelist (add your current IP or 0.0.0.0/0)');
        console.log('2. Your MONGO_URL in .env file');
        console.log('3. Your MongoDB Atlas cluster is running\n');
        // Don't exit, let the app run without DB for now
    }
}
export default ConnectDb;
