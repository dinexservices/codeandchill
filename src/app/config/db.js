import mongoose from "mongoose";


async function db_connect(){
    try {
        console.log(`🔍 Connection to: ${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URI}`, {
            dbName: `${process.env.DB_NAME}`,
        });
        console.log(`✅ Database Connected Successfully!`);
        console.log(`🖥️ DB Name: ${connectInstance.connection.name}`);
        console.log(`📌 DB Host: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("❌ Connection Failed:", error);
        process.exit(1);
    }
}

export default db_connect;
