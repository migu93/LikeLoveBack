import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: false,
        },
        tags: {
            type: Array,
            default: [],
        },
        priceProduct: {
          type: Number,
            default: 0
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Product', ProductSchema);