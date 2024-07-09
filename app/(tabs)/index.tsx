import { Image, StyleSheet, Platform, Button, Pressable, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { View, type ViewProps, Text } from 'react-native';
import { Link, useNavigation } from 'expo-router';

interface Pizza {
  id: number;
  name: string;
  price: number;
}

export default function HomeScreen() {

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://private-anon-b26f96742a-pizzaapp.apiary-mock.com/restaurants/1/menu?category=Pizza&orderBy=rank"
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>Pizza Listing</Text>
      {isLoading ? (
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Loading pizzas...</Text>
      ) : (
        <View style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {pizzas.map((pizza) => (
            <View key={pizza.id}>
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>{pizza.name}</Text>
              <TouchableOpacity>
                <Link href={{
                  pathname: `/pizza/${pizza.id}`,
                  params: {
                    pizzaName: pizza.name,
                  }
                }} asChild>
                  <Pressable style={
                    {
                      backgroundColor: "blue",
                      padding: 10,
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                  }>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>View Details</Text>
                  </Pressable>
                </Link>
              </TouchableOpacity>
              <Button
                title="Add to Cart"
              // onPress={() => handleAddToCart(pizza)}
              />
            </View>
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
