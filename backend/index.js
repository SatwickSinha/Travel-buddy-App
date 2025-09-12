import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import oauthRoutes from "./GoogleOauth/oauthRoutes.js";
import { login, register, verifyToken } from "./Controllers/loginController.js";
import { updateProfile, getUserProfile } from "./Controllers/profile.js";

// For file import and upload using multer and cloudinary
import { upload } from "./middleware/multer_middleware.js";
import uploadFile from "./Controllers/upload.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", oauthRoutes);
app.post("/register", register);
app.post("/login", login);

app.get("/profile", verifyToken, getUserProfile);
app.put("/updateProfile", verifyToken, updateProfile);

app.post("/upload", verifyToken, upload.single("file"), uploadFile);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
