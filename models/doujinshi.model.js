import mongoose from "mongoose";

const doujinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: { // Ảnh bìa
        type: String,
        required: true
    },
    pages: [{ // Mảng chứa các trang truyện (URL ảnh)
        type: String,
        required: false
    }]
}, {
    timestamps: true
});

const Doujin = mongoose.model("Doujin", doujinSchema);

export default Doujin;
