export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    // zaten var mi kontrolu
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    // zaten varsa maple ve quantityi arttir
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // cartItem ozellikleri gelip quantity degerini sadece arttirsin
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]; // eger yoksa onceki verilerin uzerine yeni itemi quantity 1 olacak sekilde ekle, quantity init edilmis oluyor
};
