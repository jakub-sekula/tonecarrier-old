import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cartItems: [],
  // setCartItems: ()=>{}
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setCartLoading] = useState(true)

  useEffect(()=>{
    let localCart = JSON.parse(localStorage.getItem('cart')) || null
    if(localCart){
      setCartItems(localCart)
      setCartLoading(false)
      console.log('loaded cart from local storage', localCart)
    }
    setCartLoading(false)
  },[])

  
  function addToCart(item) {
    const newCartItems = [...cartItems, item]
    console.log('new cart items: ', newCartItems)
    localStorage.setItem('cart', JSON.stringify(newCartItems))
    setCartItems(newCartItems);
  }

  function removeFromCart() {
    return;
  }

  function clearCart() {
    setCartItems([])
    localStorage.removeItem('cart')
    localStorage.removeItem('clientSecret')
  }

  async function calculateCartTotal() {
    return;
  }

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, setCartItems, clearCart, isCartLoading}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => React.useContext(CartContext);
