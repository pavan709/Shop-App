import React, {useEffect, useState} from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';




const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    },[dispatch]);


    if(orders.length === 0)
    {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>No orders found, maybe start ordering some products?</Text>
      </View>
    }
    if(isLoading)
    {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.green1}/>
            </View>
        )
    }
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => 
            <OrderItem amount={itemData.item.totalAmount} 
            date={itemData.item.readableDate}
            items={itemData.item.items}/>} />
    )   
}


export const orderScreenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
    }

}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
export default OrderScreen;