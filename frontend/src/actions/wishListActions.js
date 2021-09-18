import Axios from 'axios'
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_ADD_ITEM_FAIL,
  WISHLIST_REMOVE_ITEM,
} from '../constants/wishListConstant'

export const addToWishList = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`)
  const {
    wishList: { wishListItems },
  } = getState()
  if (
    wishListItems.length > 0 &&
    data.seller._id !== wishListItems[0].seller._id
  ) {
    dispatch({
      type: WISHLIST_ADD_ITEM_FAIL,
      payload: `Can't Add To The List.`,
    })
  } else {
    dispatch({
      type: WISHLIST_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    })
    localStorage.setItem(
      'wishListItems',
      JSON.stringify(getState().wishList.wishListItems)
    )
  }
}

export const removeFromWishList = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId })
  localStorage.setItem(
    'wishListItems',
    JSON.stringify(getState().wishList.wishListItems)
  )
}
