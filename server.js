import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/doujinshi.route.js';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload.route.js';

dotenv.config();

const app = express(); // ✅ Khởi tạo app trước khi dùng `app.use`

app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoutes); // ✅ Đặt sau khi khởi tạo `app`

// Serve static files (ảnh từ uploads folder)
app.use('/uploads', express.static(path.join(path.resolve(), 'backend/uploads'))); // ✅ Đúng đường dẫn

app.use("/api/doujins", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log('Server is running on port: ' + PORT);
});
