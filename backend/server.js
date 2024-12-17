import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";

import authRouters from "./routes/api.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser())
// Enable CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust the origin as needed
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRouters);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
// crypto.subtle
//   .generateKey(
//     {
//       name: "HMAC",
//       hash: { name: "SHA-256" }
//     },
//     true,
//     ["sign", "verify"]
//   )
//   .then(key => {
//     crypto.subtle.exportKey("jwk", key).then(exported => {
//       console.log(exported.k)
//     })
//   })