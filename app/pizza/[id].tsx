import { View, Text } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react'

export default function Pizza() {

    const { id, pizzaName } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: `${pizzaName}`
        })
    })

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}