import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { CartItem, useCart } from '@/hooks/useCart';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {  removeFromCart, selectCart, } from "../../redux/slices/cartSlice"
import { Link } from 'expo-router';

function PlaceHolder() {
  return (
    <View style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
    }}>
      <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>No Items are added to cart</Text>
    </View>
  );
}

function CartItemComponent({ cartItem, removeFromCart }: {
  cartItem: CartItem;
  removeFromCart: (id: number) => void;

}) {

  const { removeFromCart: AsyncRemoveFromCart } = useCart({ cartItems: useAppSelector(selectCart) });

  async function handleRemoveFromCart() {
    removeFromCart(cartItem.id);
    await AsyncRemoveFromCart(cartItem.id);
  }

  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    }}>
      <Link href={{
        pathname: `/pizza/${cartItem.id}`,
        params: {
          name: cartItem.name,
          toppings: JSON.stringify(cartItem.topping),
          price: cartItem.price,
        }
      }} asChild>
        <Text style={{ fontSize: 20, color: "white" }}>{cartItem.name}</Text>
      </Link>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}>
        <Text style={{ fontSize: 20, color: "white" }}>{cartItem.quantity}</Text>
        <TabBarIcon name="trash" size={20} color="white" onPress={() => handleRemoveFromCart()}
          style={{ fontSize: 20, color: "white" }} />
      </View>
    </View>
  );
}

export default function TabTwoScreen() {

  const cartItems = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <Text style={{
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
      }}>Cart Items</Text>

      {cartItems.length === 0 ? (
        <PlaceHolder />
      ) : (
        cartItems.map((cartItem) => (
          <CartItemComponent key={cartItem.id} cartItem={cartItem} removeFromCart={(id) => dispatch(removeFromCart(id))} />
        ))
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
