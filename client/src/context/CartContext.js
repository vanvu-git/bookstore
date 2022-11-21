import { createContext, useEffect, useReducer } from "react";
var  readCart = [];
if (localStorage.getItem('cart') === [] || localStorage.getItem('cart') === null || localStorage.getItem('cart') === "null") {
    readCart =  [];
  } else {
    readCart = JSON.parse(localStorage.getItem('cart'));
  }
const INITIAL_STATE = {
    cart: readCart
}
export const CartContext = createContext(INITIAL_STATE);
const CartReducer = (state, action) => {
    switch(action.type) {
        case "ADD_ITEM": {
            const newItem = action.payload;
            const existItem = state.cart.find((element) => {return newItem._id===element._id});
            if (existItem) {
                return {
                    ...state, 
                    cart: state.cart.map((element) => {
                        if (element._id === existItem._id) {
                           element.qty+=newItem.qty;
                           return element;
                            
                        }
                        return element;
                    })
                };

            } else {
                return {
                    ...state, cart: [...state.cart, newItem]
                };
            }
            
        }
        case "UPDATE_CART": {
            return {
                 cart: [...action.payload]
            };
        }
        case "REMOVE_ITEM": {
            const newCart = state.cart.filter((item) => {
                return item._id != action.payload;
            })
            return {
                 ...state, 
                 cart: newCart
            };
        }
        case "CLEAR_CART": {
            return {
                 cart: []
            };
        }   
        default: 
            return state;   

    }
}

export const  CartContextProvider =({children}) => {
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }, [state.cart]);
      return (
        <CartContext.Provider value={{cart: state.cart, dispatch}}>
          {children}
        </CartContext.Provider>
      );

}