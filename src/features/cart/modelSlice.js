import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModel: (state) => {
            state.isOpen = true
        },
        closeModel: (state) => {
            state.isOpen = false
        }
    }
})

export const {openModel, closeModel} = modalSlice.actions
export default modalSlice.reducer