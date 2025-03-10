import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ Hàm tạo thư mục nếu chưa tồn tại
const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// ✅ Cấu hình lưu ảnh TRUYỆN (Pages)
const storagePages = multer.diskStorage({
    destination: (req, file, cb) => {
        const pagesDir = path.resolve('backend/uploads/pages/'); // Thư mục lưu trang truyện
        ensureDir(pagesDir); // Tạo thư mục nếu chưa tồn tại
        cb(null, pagesDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// ✅ Cấu hình lưu ảnh BÌA (Cover)
const storageCover = multer.diskStorage({
    destination: (req, file, cb) => {
        const coverDir = path.resolve('backend/uploads/cover/'); // Thư mục lưu ảnh bìa
        ensureDir(coverDir); // Tạo thư mục nếu chưa tồn tại
        cb(null, coverDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// ✅ Khởi tạo `multer` với từng loại lưu trữ
const uploadPagesMiddleware = multer({ storage: storagePages }).array('pages', 100);
const uploadCoverMiddleware = multer({ storage: storageCover }).single('cover');

// ✅ API Upload ảnh TRUYỆN
export const uploadPages = (req, res) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ message: "No pages uploaded" });
    }

    const filePaths = req.files.map(file => `/uploads/pages/${file.filename}`);
    res.status(200).json({ success: true, filePaths });
};

// ✅ API Upload ảnh BÌA
export const uploadCover = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No cover uploaded" });
    }

    res.status(200).json({ success: true, filePath: `/uploads/cover/${req.file.filename}` });
};

// ✅ Xuất middleware để dùng trong route
export const uploadMiddleware = uploadPagesMiddleware;
export const coverMiddleware = uploadCoverMiddleware;
