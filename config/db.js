import mongoose  from "mongoose";

async function  ConnectDb(){
    try {
        const MONGO_URL=process.env.MONGO_URL;
        const db=await mongoose.connect(MONGO_URL);
        console.log(`Database Connected SucessFully `);
    } catch (error) {
        console.log('Error Connected To Data Base:', error.message);
        process.exit(1);
    }
}
export default ConnectDb;
