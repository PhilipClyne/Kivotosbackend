import express from 'express';
import { 
    createDoujin, 
    getAllDoujins, 
    deleteDoujin, 
    updateDoujin, 
    addPagesToDoujin, 
    getDoujinById 
} from '../controllers/doujinshi.controller.js';

const router = express.Router();

// CRUD cho Doujinshi
router.route('/').post(createDoujin).get(getAllDoujins);
router.route('/:id').get(getDoujinById).put(updateDoujin).delete(deleteDoujin);
router.put('/:id/pages', addPagesToDoujin); // API thêm trang vào bộ truyện

export default router;
