import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    topping: string[];
}

const initialState: CartItem[] = []

export const initialStateAsync = createAsyncThunk("cart/initialStateAsync", async () => {
    const data = await AsyncStorage.getItem('cartItems');

    if (data) {
        return JSON.parse(data);
    }
})

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.findIndex((cartItem) => cartItem.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state[existingItemIndex].quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const existingItemIndex = state.findIndex((cartItem) => cartItem.id === action.payload);
            if (existingItemIndex !== -1) {
                if (state[existingItemIndex].quantity > 1) {
                    state[existingItemIndex].quantity -= 1;
                } else {
                    state.splice(existingItemIndex, 1);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initialStateAsync.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer