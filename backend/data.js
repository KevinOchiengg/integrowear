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
      brand: 'fashion',
      rating: 4.8,
      numReviews: 10,
      description:
        'Features:Fashionable design shows your slim body.Graceful for showing womens charming personality.Suitable for daily wear, date, party etc.It is perfect for those carefree days.Stylish and unique design will make you more attractive.Description:Long sleeve design, 3D digital animal lion printed.Easy-matching item can go well with various clothes.Stereo , precision vehiche line, fine workmanship.',
    },

    {
      name: 'Fashion Men Denim Jeans Trousers',
      category: 'jeans trousers',
      image: '/images/denim-pant-jeans.jpg',
      price: 2000,
      countInStock: 20,
      brand: 'Fashion',
      rating: 4.5,
      numReviews: 10,
      description:
        'without compromising the comfort of the wearer. Explore top quality jeans material, and the slim fit design will give you the perfect polished look. Take your casual wear to the next level with this masterpiece! For casual days, a basic t-shirt and jeans combo works every time.This trouser is Stretching and breathable hence easier movement. Men Fashion-plus Offers the Best Price for this Perfect Quality. you can wear this trouser for casual, business and official.  Dont miss these high quality pant that you can wear day in and day out.you can wear with Shirts and T-shirt of all color.Kings mind&apparel, We appreciate you dear customer and we provide latest high quality outfits.',
    },

    {
      name: 'Fashion Men Hole Denim Pants Jeans Denim Trousers Zipper',
      category: 'jeans trouser',
      image: '/images/denim-jeans.jpg',
      price: 2500,
      countInStock: 20,
      brand: 'fashion',
      rating: 4.8,
      numReviews: 10,
      description:
        'Want to Change or choose Colour Please Add our Whatsapp 0758231661 If u have problem in size or qualityMatatu is a international fashion clothing and accessory store. Focusing on the very latest in affordable Integrowears fashion styles, both attire and stunning accessories, we feature many newest product lines, providing maximum choice and convenience to our discerning clientele. We also provide an extensive range of high quality, trendy fashion clothing together to our valued customers.Our goal is always to provide our customers with stunning, high quality fashion products at down to earth prices. Yoo To offers trending fashion-forward styles, edgy and innovative designs all delivered with a truly class-leading professional service. Top 5 Reasons to shop with us·  Huge range of quality fashion items: Extensive selection of the very latest styles for both clothing and accessories.·  All new, always new: Exciting products showcasing innovative styles are sourced and added daily by our experienced buyers. We love fashion as much as you: Our fashion-savvy staff know quality when they see it, ensuring that each item is perfect and ready to wear before it is shipped.·  Buy more, save more: With a world of styles and thousands of products at your finger tips at great prices, your purse will love you as much as your wardrobe.·Our customers always come first: You always matter to us. When you buy from us, the sale is not complete when we ship, it is complete when you are completely satisfied',
    },

    {
      name: 'Fashion Blue AntiTheft Backpack Bag X USB Charging Port',
      category: 'Bag',
      image: '/images/joystar.jpg',
      price: 1500,
      countInStock: 10,
      brand: 'fashion',
      rating: 4.5,
      numReviews: 10,
      description:
        'Anti-theft Business Laptop Backpack is designed with USB charging port that offers the convenience of charging your mobile on the go. It is the perfect backpack for easy carrying of valuables and belongings while heading to business meeting, school, weekend getaways, shopping, outdoor activities, hiking, camping, etc. This amazingly designed backpack has an anti-theft design with a hidden zipper which makes you far away from theft and protects your wallet, laptop, phone and other valuables. An ideal choice for kids and adults who demands convenience during travelling whilst ensuring the utmost safety of their belongings.Featuring a judicial selection of style and functionality, the offered backpack has multiple storage compartments which can be used for hassle-free and organized storage of laptops, mobile phone, charger, clothes, pens, keys, bottles, books, documents, umbrella, etc. We know the importance of quality. This Anti-theft Business Backpack is made of durable nylon and oxford fabric for dust-proof and water-proof nature so you can ensure that your belongings are safe even in rain and tight spaces. Besides, it also features an outer selection of 600D fabric and 6MM anti-collision sponge layer for safety. No matter whether you count yourself among school or college-going youth or a daily commuter, this amazingly designed backpack is convenient for business, school, weekend getaways, travelling and all sorts of outdoor activities. A must-have for hikers, travelers, photographers, bikers, and adventure-lovers.',
    },
    {
      name: 'Fashion Maroon Bomber Jacket',
      category: 'jacket',
      image: '/images/bomber.jpg',
      price: 2500,
      countInStock: 10,
      brand: 'fashion',
      rating: 4.0,
      numReviews: 10,
      description:
        'Dont let your classic style suffer when the temperature dips — give yourself a cool-casual layering option with this Bomber Jacket. This mens bomber jacket is made from a cotton blend, giving you a textured look while helping you maintain breathable comfort throughout your day. The full-length front zipper offers easy wear, while the solid-color design pairs with a variety of bottoms. Wear this bomber jacket with jeans and a crewneck tee, or layer it over a button-down with chinos. Either way, you will appreciate the comfort and versatile style you have  added to your closet. Order Online from Integrowears Kenya and have it delivered right at your doorstep',
    },
    {
      name: 'Fashion White Bomber Jacket',
      category: 'jacket',
      image: '/images/White_Plain_Bomer.png',
      price: 2500,
      countInStock: 10,
      brand: 'fashion',
      rating: 4.0,
      numReviews: 10,
      description:
        'Dont let your classic style suffer when the temperature dips — give yourself a cool-casual layering option with this Bomber Jacket. This Women bomber jacket is made from a cotton blend, giving you a textured look while helping you maintain breathable comfort throughout your day. The full-length front zipper offers easy wear, while the solid-color design pairs with a variety of bottoms. Wear this bomber jacket with jeans and a crewneck tee, or layer it over a button-down with chinos. Either way, you will appreciate the comfort and versatile style you have  added to your closet. Order Online from Integrowears Kenya and have it delivered right at your doorstep',
    },
    {
      name: 'Fashion Grey Casual Shoe Luxury Casual Shoes',
      category: 'sports shoes',
      image: '/images/casualshoe.jpg',
      price: 1900,
      countInStock: 10,
      brand: 'fashion',
      rating: 4.0,
      numReviews: 10,
      description:
        'These all weather mens rubber shoes which are easy to clean and maintain. Suitable for all weather seasons. These  high quality rubber shoes prevents you from slips, trips and falls. Wet and muddy conditions are a reality thus these shoes will suit you. They are necessary for your comfort especially if you work for long hours this will allow you to feel more comfortable and productive. These rubber shoes will be of benefit to you even during high temperatures because they protect you against high temperatures. Order yours on Integrowears today and get it delivered right at your doorstep',
    },
    {
      name: 'Casual Men Cool Canvas Sneakers Grey',
      category: 'sport shoes',
      image: '/images/greysneaker.jpg',
      image1: '/images/greysneakers1.jpg',
      image2: '/images/greysneakers2.jpg',
      image3: '/images/greysneakers3.jpg',
      image4: '/images/greysneakers4.jpg',
      price: 1900,
      countInStock: 10,
      brand: 'fashion',
      rating: 4.0,
      numReviews: 10,
      description:
        'The casual men fashiom sneaker is an all day comfortable wear while walking or running and its a comfort wear. Relaxed fit last to help provide versatile comfort wear after wear. It provide the Light Wear, Fashionable and Comfortable based the new trend and generation needed. Upper Material: Canvas.Out sole Material: Rubber.Style: Casual Shoes. Closure Type: Lace-Up.Feature: Non-Slip, Wear-Resisting, Comfortable.The applicable age is adult. Soft and comfortable: the feet are soft and light. Safe and secure: the concave and convex lines of the sole are non-slip and wear resistant. Dry and comfortable. The fabric is breathable and feet are free to breathe. Light as a swallow. Light and comfortable like cotton tread. Features: Light weight and breathable.High quality,soft background. This footwear is classy and gets the attention of onlookers with trendy and gorgeous finish. It pairs well with both matching and off colour outfits. The heel is evenly balanced for comfortable movement. This collection has versatility and comfort you would always require in a shoe.',
    },
    {
      name: 'Fashion Casual Men Cool Canvas Sneakers White',
      category: 'shoes',
      image: '/images/canva-sneakers.jpg',
      price: 1500,
      countInStock: 10,
      rating: 4.5,
      brand: 'fashion',
      numReviews: 10,
      description:
        'All day comfortable wear while walking or transport must be comfort wear. Relaxed fit last to help provide versatile comfort wear after wear. Our Store provide the Light Wear, Fashionable and Comfortable based the new trend and generation needed. Choose Fashion for your comfort wear and enjoy your long day!!!',
    },

    {
      name: 'Generic Mens Trend Sports Sneakers-Black & White',
      category: 'Pants',
      image: '/images/sports-sneakers.jpg',
      price: 1400,
      countInStock: 10,
      rating: 4.5,
      brand: 'Fashion',
      numReviews: 10,
      description:
        'The casual men fashiom sneaker is an all day comfortable wear while walking or running and its a comfort wear. Relaxed fit last to help provide versatile comfort wear after wear. It provide the Light Wear, Fashionable and Comfortable based the new trend and generation needed. "Choose Fashion for your comfort wear and enjoy your long day!!!" Upper Material: Canvas.Out sole Material: Rubber.Style: Casual Shoes.Closure Type: Lace-Up.Feature: Non-Slip, Wear-Resisting, Comfortable.The applicable age is adult. Soft and comfortable: the feet are soft and light. Safe and secure: the concave and convex lines of the sole are non-slip and wear resistant. Dry and comfortable. The fabric is breathable and feet are free to breathe. Light as a swallow. Light and comfortable like cotton tread. Features: Light weight and breathable.High quality, soft background.This footwear is classy and gets the attention of onlookers with trendy and gorgeous finish. It pairs well with both matching and off colour outfits. The heel is evenly balanced for comfortable movement. This collection has versatility and comfort you would always require in a shoe. ',
    },
    {
      name: ' Drawstring Sweatpants',
      category: 'Pants',
      image: '/images/sweatpant2.png',
      price: 1200,
      countInStock: 10,
      rating: 4.0,
      numReviews: 10,
      brand: 'fashion',
      description:
        'I am seller, providing customers with high-quality and low-cost products. The types of products we sell include Home & Kitchen, Health & Beauty, Fashion Clothing, Electronics, Watches & Jewelry,and so on.We keep up with the most popular fashion trends. If you like our products, please follow us and become our followers and fans. Sincerely at your service .Please feel free to contact us if you have any questions.Drawstring design provides proper fit. Solid color, easy to match.Suitable for sport and many other occasions.',
    },
    {
      name: 'Generic Women Men Cotton 3D Printed Hood',
      category: 'hood',
      image: '/images/3dhood.jpg',
      price: 2500,
      countInStock: 10,
      rating: 4.8,
      numReviews: 10,
      brand: 'Generic',
      description:
        'Features:Fashionable design shows your slim body.Graceful for showing womens charming personality.Suitable for daily wear, date, party etc. It is perfect for those carefree days. Stylish and unique design will make you more attractive. Description:Long sleeve design, 3D digital animal lion printed. Easy-matching item can go well with various clothes. Stereo, precision vehiche line, fine workmanship.',
    },
    {
      name: 'Generic Mens Sandals Sneakers Shoes Outdoor Casual Sandal',
      category: 'sandals',
      image: '/images/sandals.jpg',
      price: 850,
      countInStock: 10,
      rating: 4.8,
      numReviews: 10,
      brand: 'Fashion',
      description:
        'This footwear is classy and gets the attention of onlookers with trendy and gorgeous finish. It pairs well with both matching and off colour outfits. The heel is evenly balanced for comfortable movement. This collection has versatility and comfort you would always require in a shoe. Material: Synthetic/Soft Mesh Upper sneaker, Fastening: Lace sneaker, Cushioned ：Insoles sneaker,Durable ：Outsoles  sneaker,Style: Casual sneaker',
    },
  ],
}
export default data
