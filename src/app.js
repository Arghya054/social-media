import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static("public"));


// Import routes
import userRoutes from "./routes/user.routes.js";
// Use routes
app.use("/api/v1/users", userRoutes);

export { app };
/*import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true
}));

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(express.static("public"));

export { app };*/