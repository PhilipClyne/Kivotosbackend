import express from 'express';
import { uploadMiddleware, coverMiddleware, uploadPages, uploadCover } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/pages', uploadMiddleware, uploadPages); // Upload nhiều file
router.post('/cover', coverMiddleware, uploadCover); // Upload ảnh bìa

export default router; // ✅ Đúng, export router thay vì uploadRoutes
