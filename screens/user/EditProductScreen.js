// useReducer is different from redux reducer, here this just takes some input and spit some output
import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities)
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

const EditProductScreen = (props) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);




    const prodId = props.route.params ? props.route.params.productId : null;






    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === prodId)
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: "",
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    });


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );


    useEffect(() => {
        if(error)
        {
            Alert.alert('An error occurred', error,[{text:'Okay'}])
        }
    },[error])


    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input!", "Please check the errors in the form", [
                { text: "Okay" },
            ]);
            return;
        }
        setError(null)
        setIsLoading(true);
        try{

            if (editedProduct) {
               await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl
                    )
                );
            } else {
               await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl,
                        +formState.inputValues.price
                    )
                );
            } 
            props.navigation.goBack();
        } catch(err)
        {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName={
                            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                        }
                        onPress={submitHandler}
                    />
                </HeaderButtons>
            ),
        });
    }, [submitHandler]);



    if(isLoading)
    {
        return <View style={styles.centerd}><ActivityIndicator size='large' color={Colors.green1}/></View>
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        >
            <ScrollView>
                <View style={styles.form}>


                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"

                        onInputChange={inputChangeHandler}
                        initialValue={formState.inputValues.title}
                        initiallyValid={formState.inputValidities.title}
                        required
                    />

                    <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid Image Url!"
                        keyboardType="default"
                        returnKeyType="next"
                        initialValue={formState.inputValues.imageUrl}
                        initiallyValid={formState.inputValidities.imageUrl}
                        onInputChange={inputChangeHandler}
                        required
                    />

                    {!editedProduct && (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            required
                            onInputChange={inputChangeHandler}
                            min={0.1}
                        />
                    )}

                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        initialValue={formState.inputValues.description}
                        initiallyValid={formState.inputValidities.description}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export const editProductScreenOptions = (navData) => {






    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.productId
            ? "Edit Product"
            : "Add Product",
        
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    centerd:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    }
});
export default EditProductScreen;
