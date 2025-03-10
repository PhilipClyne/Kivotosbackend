import Doujin from '../models/doujinshi.model.js';
import mongoose from 'mongoose';

export const createDoujin = async (req, res) => {
    const { name, author, image, pages } = req.body;

    if (!name || !author || !image) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newDoujin = new Doujin({
        name,
        author,
        image,
        pages: pages || [] // Nếu không có thì để mảng rỗng
    });

    try {
        await newDoujin.save();
        res.status(201).json({ success: true, data: newDoujin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDoujins = async (req, res) => {
    try {
        const doujins = await Doujin.find({});
        res.status(200).json({ success: true, data: doujins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDoujin = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID format' });
    }
    try {
        await Doujin.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Doujin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDoujin = async (req, res) => {
    const { id } = req.params;
    const doujin = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Doujin not found' });
    }
    try {
        const updatedDoujin = await Doujin.findByIdAndUpdate(id, doujin, { new: true });
        res.status(200).json({ success: true, data: updatedDoujin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  API để upload trang truyện vào bộ truyện có sẵn
export const addPagesToDoujin = async (req, res) => {
    const { id } = req.params;
    const { pages } = req.body; // Nhận danh sách ảnh của các trang truyện

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid Doujin ID' });
    }

    try {
        const doujin = await Doujin.findById(id);
        if (!doujin) {
            return res.status(404).json({ message: 'Doujin not found' });
        }

        doujin.pages = [...doujin.pages, ...pages]; // Thêm trang vào danh sách cũ
        await doujin.save();

        res.status(200).json({ success: true, data: doujin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// API Lấy bộ truyện để hiển thị danh sách trang
export const getDoujinById = async (req, res) => {
    try {
        const doujin = await Doujin.findById(req.params.id);
        if (!doujin) {
            return res.status(404).json({ message: "Không tìm thấy bộ truyện" });
        }
        res.json(doujin); // Trả về toàn bộ doujin, bao gồm cả pages
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};
