import React from 'react';
import { ScrollView, FlatList, View, Text, StyleSheet,Image,Button,Dimensions,Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props => {
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button title='Add to Cart' color={Colors.blue2} onPress={async() => { 
                    await dispatch(cartActions.addToCart(selectedProduct));
                    Alert.alert('',`${selectedProduct.title} added to cart`,[{text:'Okay'}]);
                }}/>
            </View>
            
            <Text style={styles.price}>₹{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
export const productDetailScreenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.productTitle,
    }
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: Dimensions.get('window').height * 0.5,
        resizeMode:'contain'
    },
    price:{
        fontSize:20,
        color: '#888',
        textAlign:'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'

    },
    description:{
        fontSize:14,
        textAlign: 'center',
        marginHorizontal:20,
        fontFamily: 'open-sans'

    },
    actions:{
        marginVertical:10,
        alignItems:'center',
    }
})
export default ProductDetailScreen;