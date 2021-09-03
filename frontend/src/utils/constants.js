import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import product1 from '../assets/shoe1.jpg';
import product2 from '../assets/hood.png';
import product3 from '../assets/hood3.png';
import product4 from '../assets/mixture.png';
import product5 from '../assets/khakies.png';
import product6 from '../assets/jeans3.png';
import product7 from '../assets/mixture2.png';
import product14 from '../assets/bag.jpg';
import product15 from '../assets/bomba.png';
import product16 from '../assets/shirt1.png';
import product17 from '../assets/jeans2.png';
import product18 from '../assets/Tshirt1.png';
import product19 from '../assets/sweatpant2.png';
import product20 from '../assets/Tshirts.png';
import product21 from '../assets/shoe.jpg';
import product22 from '../assets/airforce1.png';
import product23 from '../assets/airforce2.png';
import product24 from '../assets/airforce3.jpg';
import { FaStarHalfAlt } from 'react-icons/fa';
import userOne from '../assets/customer-1.jpg';
import userTwo from '../assets/customer-2.jpg';
import userThree from '../assets/customer-3.jpg';
import userFour from '../assets/customer-4.jpg';
import userFive from '../assets/customer-7.jpg';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaHome,
  FaProductHunt,
  FaCcVisa,
  FaRegUser,
} from 'react-icons/fa';

export const social = [
  {
    id: 1,
    url: 'https://www.facebook.com/Swag-Mode-100392718038597',
    icon: <FaFacebookF />,
  },
  {
    id: 2,
    url: 'https://www.facebook.com/Swag-Mode-100392718038597',
    icon: <FaTwitter />,
  },

  {
    id: 3,
    url: 'https://www.facebook.com/Swag-Mode-100392718038597',
    icon: <FaInstagram />,
  },
  {
    id: 4,
    url: 'https://www.facebook.com/Swag-Mode-100392718038597',
    icon: <FaPinterestP />,
  },
];

export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
  {
    id: 4,
    text: 'Contact',
    url: '/contact',
  },
];

export const products_url =
  'https://pure-chamber-12620.herokuapp.com/api/products/';

export const single_product_url = `https://pure-chamber-12620.herokuapp.com/api/singleproduct=`;

export const products = [
  {
    id: 1,
    image: product1,
    title: 'Fashion Casual Sneakers',
    description: 'Fashion Casual Sneakers Man Flats Breathable Shoes Fashion',
    rating: 4,
    price: 2500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 2,
    image: product2,
    title: 'Printed Hoodie',
    description: 'Fashion 2021 Bule Rick Morty Printed 3D Hoodie Sweatshirts',
    rating: 4,
    price: 650,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 3,
    image: product3,
    title: 'Hoodie 3D Sweatshirts',
    description: 'Fashion 2021 Bule Rick Morty Printed 3D Hoodie Sweatshirts',
    rating: 5,
    price: 1999,
    category: 'office',
    shipping: true,
  },
  {
    id: 4,
    image: product17,
    title: 'Fashion Mens Fitting Jeans ',
    description: 'Generic Men Pants Hip Hop Harem Jeans Trousers Multi-pocket',
    rating: 4,
    price: 1000,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 5,
    image: product22,
    title: 'Casual Sports Shoes',
    description: 'Fashion Young Boys All-match Casual Sports Shoes',
    rating: 4,
    price: 2500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 6,
    image: product6,
    title: 'Hip Hop Jeans Trousers',
    description: 'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
    rating: 4,
    price: 2500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 7,
    image: product4,
    title: ' Fashion Hot Mens Jeans',
    description: 'Fashion Mens Casual Comfortable Slim-fit  Simple Jeans',
    rating: 4,
    price: 600,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },

  {
    id: 8,
    image: product24,
    title: 'Nike Slick Air Max Shoe',
    description: 'Nike Slick Air Max Shoe',
    rating: 4,
    price: 2500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },

  {
    id: 9,
    image: product14,
    title: 'Swagger Outdoor Bag',
    description: 'Generic Men Outdoor Bag Swagger Bag Casual Sling for Leisure',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 10,
    image: product5,
    title: 'Fashion hard Khaki-Beige',
    description: 'Fashion 6 hard Khaki-Beige,maroon, Choc,Nblue, Green&black',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 11,
    image: product17,
    title: 'Hip Hop Jeans Trousers',
    description: 'Generic Men Pants Hip Hop Jeans Trousers Multi-pocket Sweat',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 12,
    image: product18,
    title: 'Printed  T-shirt',
    description: 'Dope Printed  T-shirt',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 13,
    image: product19,
    title: ' Fashion Mens Sweatpants',
    description:
      'Fashion Generic Fashion Mens Loose Sweatpants Drawstring Pant',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 14,
    image: product20,
    title: 'Printed  T-shirt',
    description: 'Dope Printed Classic T-shirt',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 15,
    image: product21,
    name: 'Classic Official leather Shoes',
    description: 'Fashion Classic Official leather Black Shoes - Slip-on',
    rating: 4,
    price: 500,
    category: 'office',
    shipping: true,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
];

const people = [
  {
    id: 1,
    image: userOne,
    name: 'Bowling',
    title: 'Customer',
    quote:
      'Integro wears is really amazing, I have been buying things from Integro, they are reliable and trustworthy, the best online store ever.',
  },
  {
    id: 2,
    image: userTwo,
    name: 'I dont Mind',
    title: 'Customer',
    quote:
      'Excellent company and website. The products arrived on time and at a better price.',
  },
  {
    id: 3,
    image: userThree,
    name: 'Look At Me',
    title: 'Designer',
    quote:
      'The best online shopping ever..were u can get all you need.. and quick shipping also.thanks to Integro',
  },
  {
    id: 4,
    image: userFour,
    name: 'The Boss',
    title: 'Fashionist',
    quote:
      'Integro is simply the BEST! Their prices are absolutely AFFORDABLE and their services are RELIABLE. ',
  },
  {
    id: 5,
    image: userFive,
    name: 'Jalango',
    title: 'Presenter',
    quote:
      'I love Integro. I cant wait to shop with them again and again and again....',
  },
];

export default people;

// [
//   ({
//     id: 'recZkNf2kwmdBcqd0',
//     name: 'accent chair',
//     price: 25999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160',
//     colors: ['#ff0000', '#00ff00', '#0000ff'],
//     company: 'marcos',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//     shipping: true,
//   },
//   {
//     id: 'recEHmzvupvT8ZONH',
//     name: 'albany sectional',
//     price: 109999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/0be1af59cf889899b5c9abb1e4db38a4/d631ac52',
//     colors: ['#000', '#ffb900'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//   },
//   {
//     id: 'rec5NBwZ5zCD9nfF0',
//     name: 'albany table',
//     price: 309999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/7478483f40a2f56662a87b304bd4e104/707d397f',
//     colors: ['#ffb900', '#0000ff'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'kitchen',
//   },
//   {
//     id: 'recd1jIVIEChmiwhe',
//     name: 'armchair',
//     price: 12599,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/530c07c5ade5acd9934c8dd334458b86/cf91397f',
//     colors: ['#000', '#00ff00', '#0000ff'],
//     company: 'marcos',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'bedroom',
//     shipping: true,
//   },
//   {
//     id: 'recoM2MyHJGHLVi5l',
//     name: 'bar stool',
//     price: 4099,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/a6119fabf7256049cc0e8dbcdf536c9c/b0153f66',
//     colors: ['#000'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'dining',
//     shipping: true,
//   },
//   {
//     id: 'recotY5Nh00DQFdkm',
//     name: 'dining table',
//     price: 42999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/7a38cf782907773d9900165530cfa583/d9f41960',
//     colors: ['#00ff00', '#0000ff', '#ff0000'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'dining',
//     shipping: true,
//   },
//   {
//     id: 'rec1Ntk7siEEW9ha1',
//     name: 'emperor bed',
//     price: 23999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/0446e84c5bca9643de3452a61b2d6195/1b32f48b',
//     colors: ['#0000ff', '#000'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'bedroom',
//     shipping: true,
//   },
//   {
//     id: 'recNZ0koOqEmilmoz',
//     name: 'entertainment center',
//     price: 59999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/65708b701baa3a84883ad48301624b44/2de058af',
//     featured: true,
//     colors: ['#000', '#ff0000'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//     shipping: true,
//   },
//   {
//     id: 'recrfxv3EwpvJwvjq',
//     name: 'high-back bench',
//     price: 39999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/1af97a4d3eb28563962d8e3520727ffc/1b9cc17f',
//     featured: true,
//     colors: ['#000', '#00ff00'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//     shipping: true,
//   },
//   {
//     id: 'recoW8ecgjtKx2Sj2',
//     name: 'leather chair',
//     price: 20099,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/d3174ad774fc628e1d50b77e3bec399f/1de7b97a',
//     colors: ['#ff0000', '#ffb900', '#00ff00'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'bedroom',
//   },
//   {
//     id: 'recEOA6qtDag1hRbU',
//     name: 'leather sofa',
//     price: 99999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/a2f371071cf292badbb621294758b600/ca963b31',
//     colors: ['#00ff00', '#0000ff'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//   },
//   {
//     id: 'recoAJYUCuEKxcPSr',
//     name: 'modern bookshelf',
//     price: 31999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/1e4a818f5184993e430420a152315b40/873c7094',
//     featured: true,
//     colors: ['#ffb900', '#ff0000', '#00ff00'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'kids',
//   },
//   {
//     id: 'recQ0fMd8T0Vk211E',
//     name: 'modern poster',
//     price: 3099,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359',
//     colors: ['#000'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//     shipping: true,
//   },
//   {
//     id: 'rec7CjDWKRgNQtrKe',
//     name: 'shelf',
//     price: 30999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/2fd8fb02cc6fa5620504de41fbb662f9/3157a507',
//     colors: ['#00ff00'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//   },
//   {
//     id: 'recF0KpwlkF7e8kXO',
//     name: 'simple chair',
//     price: 109999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/c9d46754faf94d2283e15ac3b8accb9a/a6c343c8',
//     colors: ['#0000ff'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//     shipping: true,
//   },
//   {
//     id: 'recs5BSVU3qQrOj4E',
//     name: 'sofa set',
//     price: 129999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/fe9d4f25fee307f6ae5b7a462b70b942/031464c4',
//     colors: ['#00ff00', '#ffb900'],
//     company: 'marcos',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//     shipping: true,
//   },
//   {
//     id: 'recroK1VD8qVdMP5H',
//     name: 'suede armchair',
//     price: 15999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/1cf03bfcee117bd92273d996a82a1534/47ef57c7',
//     colors: ['#ffb900'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//   },
//   {
//     id: 'rec7JInsuCEHgmaGe',
//     name: 'utopia sofa',
//     price: 79999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/5ebc46a9e31a09cbc6078190ab035abc/8480b064',
//     featured: true,
//     colors: ['#ff0000', '#00ff00'],
//     company: 'liddy',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'living room',
//   },
//   {
//     id: 'rec3jeKnhInKHJuz2',
//     name: 'vase table',
//     price: 120999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/1e222e36e935db2695c33e3d30c2e482/91b542e0',
//     featured: true,
//     colors: ['#ff0000'],
//     company: 'marcos',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//   },
//   {
//     id: 'recv2ohxljlK2FZO7',
//     name: 'wooden bed',
//     price: 250099,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/1d692023f254ca11a3d1a3628d198081/e922a771',
//     colors: ['#000', '#ffb900'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'bedroom',
//   },
//   {
//     id: 'recJIjREF3dlFi3sR',
//     name: 'wooden desk',
//     price: 150999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/e3fa7aa6dc112c4998da18bb401bd70f/61e2fb5e',
//     colors: ['#000'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//     shipping: true,
//   },
//   {
//     id: 'recm7wC8TBVdU9oEL',
//     name: 'wooden desk',
//     price: 40099,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/954dfa5c8ce3df84a3c7254481464366/a3bd8c4a',
//     colors: ['#0000ff', '#00ff00'],
//     company: 'ikea',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'office',
//   },
//   {
//     id: 'rectfNsySwAJeWDN2',
//     name: 'wooden table',
//     price: 234999,
//     image:
//       'https://dl.airtable.com/.attachmentThumbnails/e8c2f821d05b9e4e5aa450a19e62ffa5/271fc3f5',
//     featured: true,
//     colors: ['#ffb900', '#ff0000'],
//     company: 'caressa',
//     description:
//       'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
//     category: 'kitchen',
//     shipping: true,
//   }),
// ];
