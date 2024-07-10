import { Pizza } from '@/app/(tabs)';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface CartItem extends Pizza {
    quantity: number;
}

export function useCart({ cartItems }: { cartItems: CartItem[] }) {

    const addToCart = async (item: CartItem) => {
        const newCartItems = [...cartItems];
        const existingItemIndex = newCartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            newCartItems[existingItemIndex].quantity += 1;
        } else {
            newCartItems.push({ ...item, quantity: 1 });
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const removeFromCart = async (id: number) => {
        const newCartItems = [...cartItems];
        const existingItemIndex = newCartItems.findIndex((cartItem) => cartItem.id === id);

        if (existingItemIndex !== -1) {
            if (newCartItems[existingItemIndex].quantity > 1) {
                newCartItems[existingItemIndex].quantity -= 1;
            } else {
                newCartItems.splice(existingItemIndex, 1);
            }
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    return { addToCart, removeFromCart };
}