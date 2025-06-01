import * as cartActionTypes from "./cartActions";

const initialState = {
    cartQuantity: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartQuantity: state.cartQuantity + 1
            }
        default:
            return state
    }
}

export default cartReducer;