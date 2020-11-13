import { createSelector } from "reselect";

const selectCart = (state) => state.cart; // cart state'i

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// her seferinde renderlamamasi icin bu yontemi kullandik (memoize)
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      // cartItem.quantity gezerek kumulatif sekilde ekliyor
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
