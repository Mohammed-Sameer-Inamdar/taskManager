import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        useUnifiedTopology: true, //for longer time connection and to it will automaticallt checks the connection status
        useNewUrlParser: true  //use the new MongoDB connection string parser.
    });

    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id
            delete converted._id;
        }
    });
}

export default connectDB;