const { response } = require('express')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})
//Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    //Tach cac truong du lieu dab biet ra khoi query
    const excludeFields = ['limit', 'sort', 'page', 'fields',]
    excludeFields.forEach(el => delete queries[el])

    //Format lai cac operators cho dung cu phap mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    console.log(formatedQueries);

    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formatedQueries)

    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }
    //Pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    //Excute query
    //So luong san pham thoa man dieu kien !== so luong san pham tra ve sau 1 lan goi API
    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message)
        const counts = await Product.find(formatedQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response ? response : 'Cannot get products'
        })
    })
})
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid, updatedAt } = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    // console.log(alreadyRating);
    if (alreadyRating) {
        // update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt }
        }, { new: true })
    } else {
        // add star & comment
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id, updatedAt } }
        }, { new: true })
    }

    // Sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()


    return res.status(200).json({
        success: true,
        updatedProduct
    })
})
const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Cannot upload images product'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}