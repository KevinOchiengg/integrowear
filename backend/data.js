import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'Ko-technologies',
      email: 'kotechnologies@gmail.com',
      password: bcrypt.hashSync('kotechnologies', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Nike',
        logo: '/images/logo.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Moses Juma',
      email: 'kevinohkelvin9@gmail.com',
      password: bcrypt.hashSync('Moses Juma integro', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      image: '/images/hood5.png',
      name: 'Hoodies Graphic Space Pull-over',
      description:
        'Hgvoetty Unisex 3D Print Hoodies Graphic Space Pullover Hooded Sweatshirts for Men Women',
      rating: 4,
      price: 2500,
      numReviews: 10,
      countInStock: 2,
      category: 'Hood',
      brand: 'Luois Vuitton',
    },

    {
      image: '/images/shoe1.jpg',
      name: 'Sports Shoes',
      description: 'Fashion Young Boys All-match Casual Sports Shoes',
      rating: 4,
      price: 2500,
      numReviews: 10,
      countInStock: 20,
      category: 'Sports Shoes',
      brand: 'Nike',
    },

    {
      image: '/images/airforce3.jpg',
      name: 'Nike Slick Air Max Shoe',
      description: 'Nike Slick Air Max Shoe',
      rating: 4,
      price: 2500,
      numReviews: 10,
      countInStock: 10,
      category: 'Shoes',
      brand: 'Air max',
    },

    {
      image: '/images/bag.jpg',
      name: 'Luois Vuitton Bag',
      description:
        'Generic Men Outdoor Bag Swagger Bag Casual Sling for Leisure',
      rating: 4,
      price: 800,
      numReviews: 10,
      countInStock: 10,
      category: 'Bag',
      brand: 'Luois Vuitton',
    },
    {
      image: '/images/bag2.jpg',
      name: 'Swagger Dior Bag',
      description:
        'Generic Men Outdoor Bag Swagger Bag Casual Sling for Leisure',
      rating: 4,
      price: 800,
      numReviews: 10,
      countInStock: 10,
      category: 'Bag',
      brand: 'Dior',
    },
    {
      image: '/images/khakis.png',
      name: 'Fashion hard Khaki',
      description:
        'Fashion 6 hard Khaki-Beige, maroon, Choc, blue, Green & black',
      rating: 4,
      price: 1000,
      numReviews: 10,
      countInStock: 10,
      category: 'khaki',
      brand: 'khaki',
    },
    {
      image: '/images/jeans2.jpg',
      name: 'Jeans Trousers',
      description:
        'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
      rating: 4,
      price: 1500,
      numReviews: 10,
      countInStock: 10,
      category: 'Jeans',
      brand: 'Unknown',
      new: 'new',
    },
    {
      image: '/images/jeans3.jpg',
      name: 'men Jeans Trousers',
      description:
        'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
      rating: 4,
      price: 1500,
      numReviews: 10,
      countInStock: 10,
      category: 'Jeans',
      brand: 'Unknown',
    },

    {
      image: '/images/sweatpants.jpg',
      name: 'Mens Sweatpants',
      description:
        'Fashion Generic Fashion Mens Loose Sweatpants Drawstring Pant',
      rating: 4,
      price: 1200,
      numReviews: 10,
      countInStock: 10,
      category: 'Pants',
      brand: 'Unknown',
      new: 'new',
    },
    {
      image: '/images/sweatpant2.png',
      name: ' Drawstring Sweatpants',
      description:
        'Fashion Generic Fashion Mens Loose Sweatpants Drawstring Pant',
      rating: 4,
      price: 1200,
      numReviews: 10,
      countInStock: 10,
      category: 'Pants',
      brand: 'Unknown',
      new: 'new',
    },
    {
      image: '/images/T-shirts.png',
      name: 'Printed  T-shirt',
      description: 'Dope Printed Classic T-shirt',
      rating: 4,
      price: 850,
      numReviews: 10,
      countInStock: 10,
      category: 'T-shirts',
      brand: 'Dior',
    },
  ],
}
export default data
