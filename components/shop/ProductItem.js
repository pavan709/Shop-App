import React from 'react';
import {
    FlatList, View, Text, StyleSheet, Image, Button, TouchableOpacity,
    TouchableNativeFeedback, Platform, Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';
const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21)
        TouchableCmp = TouchableNativeFeedback;
    return (
        <Card style={styles.product}>
            
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    <Image style={styles.image} source={{ uri: props.image }} />
                    <View style={styles.detail}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>₹{props.price.toFixed(2)}</Text>
                    </View>

                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </Card>)
}


const styles = StyleSheet.create({
    product: {

        height: Dimensions.get('window').height * 0.4,
        overflow: 'hidden',

        margin: 20,
    },
    image: {
        marginTop:'1%',
        width: '100%',
        height: '60%',
        resizeMode:'contain'
    },
    title: {
        fontSize: 18,
        marginVertical: 0,
        fontFamily: 'open-sans-bold'
    },
    detail: {
        alignItems: 'center',
        height: '17%',
        padding: 10,

    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans-bold'

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },
})
export default ProductItem;