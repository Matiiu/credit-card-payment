import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productId: '',
    product: {},
    userInfo: {},
    step: 1,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.product = action.payload.product;
        },
        addPayInfo: (state, action) => {
            state.userInfo = action.payload.userInfo;
        },
        saveStep: (state, action) => {
            state.step = action.payload;
        }
    }
})

export const { addProduct, addPayInfo, saveStep } = productSlice.actions;
export default productSlice.reducer;