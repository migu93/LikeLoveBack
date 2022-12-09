import ProductSchema from "../models/product.js";

export const getAll = async (req, res) => {
    try {
        const products = await ProductSchema.find();

        res.json(products)
    }
    catch (err) {
        return res.status(500).json({
            message: 'Не удалось получить все товары'
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new ProductSchema({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
        });
        const product = await doc.save();

        res.json(product)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось создать товар'
        });
    }
}

export const getOne = async (req, res) =>{
    try {
        const productId = req.params.id;

        ProductSchema.findOneAndUpdate({
            _id: productId,
        },{
            returnDocument: 'after',
        }, (err, doc) =>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Не удалось получить товары'
                });
            };
            if (!doc){
                return res.status(404).json({
                    message: 'Товар не найден',
                })
            }
            res.json(doc);
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось получить товар'
        });
    }
}

export const remove = async (req, res) =>{
    try {
        const productId = req.params.id;
        ProductSchema.findOneAndRemove({
            _id: productId,
        }, (err, doc) =>{
            if (err){
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось удалить товар'
                })
            }
            if (!doc) {
                return res.status(500).json({
                    message: 'Товар не найден'
                })
            }
            res.json({
                success: true,
            })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось получить товар'
        });
    }
}

export const update = async (req, res) =>{
    try {
        const productId = req.params.id;

        await ProductSchema.updateOne({
            _id: productId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            priceProduct: req.body.priceProduct,
        })
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось обновить товар'
        });
    }
}