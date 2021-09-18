import {
  WISHLIST_ADD_ITEM,
  WISHLIST_ADD_ITEM_FAIL,
  WISHLIST_EMPTY,
  WISHLIST_REMOVE_ITEM,
} from '../constants/wishListConstant'

export const WishListReducer = (state = { wishListItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload
      const existItem = state.wishListItems.find(
        (x) => x.product === item.product
      )
      if (existItem) {
        return {
          ...state,
          error: '',
          wishListItems: state.wishListItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          error: '',
          wishListItems: [...state.wishListItems, item],
        }
      }
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        wishListItems: state.wishListItems.filter(
          (x) => x.product !== action.payload
        ),
      }

    case WISHLIST_ADD_ITEM_FAIL:
      return { ...state, error: action.payload }
    case WISHLIST_EMPTY:
      return { ...state, error: '', wishListItems: [] }
    default:
      return state
  }
}
