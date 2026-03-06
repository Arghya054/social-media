import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






/*import express from "express";
const app = express();

dotenv.config();


( async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, 
            {
                dbName: DB_name
            }
        );
        console.log("Connected to MongoDB successfully!");
        app.on("error", (error) => {
            console.error("Express server error:", error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}) ();*/