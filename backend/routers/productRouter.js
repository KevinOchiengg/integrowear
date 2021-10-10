import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js'

const productRouter = express.Router()

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
    const name = req.query.name || ''
    const category = req.query.category || ''
    const seller = req.query.seller || ''
    const order = req.query.order || ''
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
    const sellerFilter = seller ? { seller } : {}
    const categoryFilter = category ? { category } : {}
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {}
    const ratingFilter = rating ? { rating: { $gte: rating } } : {}
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 }
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
    res.send({ products, page, pages: Math.ceil(count / pageSize) })
  })
)

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
  })
)

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true })
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }))
      const createdProducts = await Product.insertMany(products)
      console.log(createdProducts)
      res.send({ createdProducts })
    } else {
      res
        .status(500)
        .send({ message: 'No seller found. first run /api/users/seed' })
    }
  })
)

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews'
    )
    if (product) {
      res.send(product)
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  })
)

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      image: '/images/lofers.jpg',
      name: 'Shipped Fashion Men PU Leather Casual Shoes Loafers Shoes-white',
      description:
        'This pair in addition to being comfortable is verystylish. A must have for the classic man. We have got the best prices and service.This shoes is more convenient to wear shoes, showing a uniform and smooth line texture, simple and generous.Lightweight rubber outsole: with a soft, cushioned rubber sole for an elegant, stylish and simple. Clear texture design, Strong grip, non-slip, wear-resistant. So durable rubber outsole delivers traction on a variety of surfaces. Comfortable and delicate fabric: exudes natural luster, highlights the quality, and shows mens casual style. Comfortable lining: According to ergonomics, the inner part is made of breathable and foot-fitting material, so that your feet can keep breathing smoothly and easily meet the needs of life.Simple and Fashionable, Soft and Comfortable, Lightweight and wear-resistant，it is perfect for daily use.This classic monk single buckle shoes features Leather upper, slip on design for easy on/off wear, and monk shoes detailing on side for added style. Moreover, It is finished with smooth leather Lining, cushioned footbed for comfort, and non-skid outsole. This kind of shoes you wear, jeans or pants collocation, make you reflect the tough temperament!Featuring durable outsoles that enable easy traction, it is also very comfortable. A perfect match with semi-casual and official outfits.If you were not satisfied with something please contact us before you leave us a Negative feedback.we will always try our best for 100% customer satisfaction.Thats why we are here! All emails will be answered within 48 hours (Sat. & Sun. excluded). So please do not hesitate to email us!The size of this shoe is a bit too small, please buy a size larger than the usual shoes.',
      rating: 4,
      price: 1600,
      numReviews: 10,
      countInStock: 19,
      category: 'shoes',
      brand: 'fashion',
    })
    const createdProduct = await product.save()
    res.send({ message: 'Product Created', product: createdProduct })
  })
)
productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
      product.name = req.body.name
      product.price = req.body.price
      product.image = req.body.image
      product.category = req.body.category
      product.brand = req.body.brand
      product.countInStock = req.body.countInStock
      product.description = req.body.description
      const updatedProduct = await product.save()
      res.send({ message: 'Product Updated', product: updatedProduct })
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  })
)

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      const deleteProduct = await product.remove()
      res.send({ message: 'Product Deleted', product: deleteProduct })
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  })
)

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' })
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length
      const updatedProduct = await product.save()
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      })
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  })
)

export default productRouter
