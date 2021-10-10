import { FaCreditCard, FaBriefcase } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { MdDashboard } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import React from 'react'

const sublinks = [
  {
    page: 'PRODUCTS',
    links: [
      { label: 'payment', icon: <FaCreditCard />, url: '/products' },
      { label: 'terminal', icon: <FaCreditCard />, url: '/products' },
      { label: 'connect', icon: <FaCreditCard />, url: '/products' },
    ],
  },

  {
    page: 'ADMIN',
    links: [
      { label: 'Dashboard', icon: <MdDashboard />, url: '/dashboard' },
      { label: 'Products', icon: <FaBriefcase />, url: '/productlist' },
      { label: 'Orders', icon: <FaBriefcase />, url: '/orderlist' },
      { label: 'Users', icon: <CgProfile />, url: '/userlist' },
      { label: 'Support', icon: <BiSupport />, url: '/support' },
    ],
  },
  {
    page: 'SELLER',
    links: [
      { label: 'Products', icon: <FaBriefcase />, url: '/productlist/seller' },
      { label: 'Orders', icon: <FaBriefcase />, url: '/orderlist/seller' },
    ],
  },
  {
    page: 'CATEGORY',
    links: [{ label: '' }],
  },
  {
    page: 'ACCOUNT',
    links: [
      { label: 'User Profile', icon: <CgProfile />, url: '/profile' },
      { label: 'Order History', icon: <FaBriefcase />, url: '/orderhistory' },
    ],
  },
]

export default sublinks
