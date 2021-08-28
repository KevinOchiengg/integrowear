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
      name: 'Hoodies Graphic Space Pull-over',
      category: 'Hood',
      image: '/images/hood5.png',
      price: 2500,
      countInStock: 2,
      brand: 'Luois Vuitton',
      rating: 4.8,
      numReviews: 10,
      description:
        'Hgvoetty Unisex 3D Print Hoodies Graphic Space Pullover Hooded Sweatshirts for Men Women',
    },

    {
      name: 'Sports Shoes',
      category: 'Shoes',
      image: '/images/shoe1.jpg',
      price: 2500,
      countInStock: 20,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'Fashion Young Boys All-match Casual Sports Shoes',
    },

    {
      name: 'Nike Slick Air Max Shoe',
      category: 'Shoes',
      image: '/images/airforce3.jpg',
      price: 2500,
      countInStock: 20,
      brand: 'Air max',
      rating: 4.8,
      numReviews: 10,
      description: 'Nike Slick Air Max Shoe',
    },

    {
      name: 'Luois Vuitton Bag',
      category: 'Bag',
      image: '/images/bag.jpg',
      price: 800,
      countInStock: 10,
      brand: 'Luois Vuitton',
      rating: 4.5,
      numReviews: 10,
      description:
        'Generic Men Outdoor Bag Swagger Bag Casual Sling for Leisure',
    },
    {
      name: 'Swagger Dior Bag',
      category: 'Bag',
      image: '/images/bag2.jpg',
      price: 800,
      countInStock: 10,
      brand: 'Dior',
      rating: 4.0,
      numReviews: 10,
      description:
        'Generic Men Outdoor Bag Swagger Bag Casual Sling for Leisure',
    },
    {
      name: 'Fashion hard Khaki',
      category: 'pants',
      image: '/images/khakis.png',
      price: 1000,
      countInStock: 10,
      brand: 'khaki',
      rating: 4.0,
      numReviews: 10,
      description:
        'Fashion 6 hard Khaki-Beige, maroon, Choc, blue, Green & black',
    },
    {
      name: 'Jeans Trousers',
      category: 'Jeans',
      image: '/images/jeans2.jpg',
      price: 1500,
      countInStock: 10,
      brand: 'khaki',
      rating: 4.0,
      numReviews: 10,
      description:
        'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
    },
    {
      name: 'men Jeans Trousers',
      category: 'pants',
      image: '/images/jeans3.jpg',
      price: 1500,
      countInStock: 10,
      rating: 4.5,
      brand: 'pants',
      numReviews: 10,
      description:
        'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
    },

    {
      name: 'Mens Sweatpants',
      category: 'Pants',
      image: '/images/sweatpants.jpg',
      price: 1200,
      countInStock: 10,
      rating: 4.5,
      brand: 'pants',
      numReviews: 10,
      description:
        'Fashion Generic Fashion Mens Loose Sweatpants Drawstring Pant',
    },
    {
      name: ' Drawstring Sweatpants',
      category: 'Pants',
      image: '/images/sweatpant2.png',
      price: 1200,
      countInStock: 10,
      rating: 4.0,
      numReviews: 10,
      brand: 'Unknown',
      description:
        'Fashion Generic Fashion Mens Loose Sweatpants Drawstring Pant',
    },
    {
      name: 'Printed  T-shirt',
      category: 'T-shirts',
      image: '/images/T-shirts.png',
      price: 850,
      countInStock: 10,
      rating: 4.8,
      numReviews: 10,
      brand: 'Dior',
      description: 'Dope Printed Classic T-shirt',
    },
  ],
}
export default data
