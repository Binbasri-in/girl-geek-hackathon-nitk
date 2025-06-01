export const TOGGLE_CAMERA_MODAL = 'TOGGLE_CAMERA_MODAL'

export const toggleCameraModalSuccess = (toggleValue) => ({
    type: TOGGLE_CAMERA_MODAL,
    payload: { toggleValue }
})

export function toggleCameraModal(toggleValue) {
    return dispatch => {
        dispatch(toggleCameraModalSuccess(toggleValue))
    }
}