import { View, Text } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Pizza } from '../(tabs)';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PizzaComponent() {

    const { id, name, price, toppings, rank } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: `${name}`
        })
    }, [id])

    return (
        <SafeAreaView style={{ height: "auto" }}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 30, color: "white" }}>{name}</Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Toppings: </Text>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        {toppings && typeof toppings === 'string' && JSON.parse(toppings).map((topping: string, index: number) => (
                            <Text key={index} style={{ fontSize: 20, color: "white" }}>{topping + `${index < topping.length - 1 ? "," : ""}`}</Text>
                        ))}
                        {toppings === undefined && <Text style={{ fontSize: 20, color: "white" }}>N/A</Text>}
                    </View>
                </View>
                <Text style={{ color: "white", fontSize: 20 }}>Price : {"$" + price}</Text>
            </View>
        </SafeAreaView>
    )
}