import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerItemList, } from "@react-navigation/drawer";
import ProductsOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreens";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import OrderScreen, { orderScreenOptions } from "../screens/shop/OrderScreen";
import Colors from "../constants/Colors";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  Button,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import UserProductsScreen, {
  userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.blue12 : "",
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.blue10,
  headerBackTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};
const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};



const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={orderScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};


const AdminStackNavigator = createStackNavigator();
const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};



const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator drawerContent={(props) => {
        
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizantal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.blue1}
                onPress={() => {
                  dispatch(authActions.logout());

                }}
              />
            </SafeAreaView>
          </View>
        );
      }} screenOptions={{activeTintColor: Colors.green2,drawerContentContainerStyle:{marginTop:StatusBar.currentHeight,}}}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => {
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />;
          },
          headerShown:false,
          
        }}
      />
      <ShopDrawerNavigator.Screen
        name="OrdersNav"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => {
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          },
          headerShown:false,
          drawerLabel:'Orders',
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => {
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />;
          },
          headerShown:false,
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};





const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen }  options={authScreenOptions}/>
        </AuthStackNavigator.Navigator>
    )
}

