import React, { useState, useEffect, useCallback } from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    ActivityIndicator,
    Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";
import { isLoading } from "expo-font";
const ProductsOverviewScreen = (props) => {
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const [error, setErrror] = useState();
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();
    const isAuth = useSelector( state => state.auth.token)


    const loadProducts = useCallback(async () => {
        
        setErrror(null);
        setIsRefreshing(true);
        // the error comes from products.js in actions folder
        try{

            await dispatch(productsActions.fetchProducts());
        } catch(err){
            setErrror(err.message);
        }
        setIsRefreshing(false);
    },[dispatch, setIsLoading, setErrror])



 
    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus',
            loadProducts
        );

        return () => {
            willFocusSub();
        }



    },[loadProducts]);


    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);




    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title,
        });
    };

    if(error)
    {
        return (
            <View style={styles.centered}>
                <Text>An error occurred</Text>
                <Button title='Try again' onPress={loadProducts} color={Colors.blue1}/>
            </View>
        );  
    }
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.green1} />
            </View>
        );
    }
    if(!isLoading && products.length === 0)
    {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some</Text>
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            style={styles.screen}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                    
                >
                    <Button
                        style={{marginBottom:10,}}
                        color={Colors.red5}
                        title="view details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        color={Colors.red5}
                        title="To Cart"
                        onPress={async () => {
                            

                                await dispatch(cartActions.addToCart(itemData.item));
                                Alert.alert('',`${itemData.item.title} added to cart`,[{text:'Okay'}]);
                            
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

export const productOverviewScreenOptions = (navData) => {
    return {
        headerTitle: "All Products",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    onPress={() => {
                        navData.navigation.navigate("Cart");
                    }}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,

    },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default ProductsOverviewScreen;
