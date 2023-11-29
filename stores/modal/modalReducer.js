import * as modalActionTypes from "./modalActions";

const initialState = {
    showCameraModal: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalActionTypes.TOGGLE_CAMERA_MODAL:
            return {
                ...state,
                showCameraModal: action.payload.toggleValue
            }
        default:
            return state
    }
}

export default modalReducer