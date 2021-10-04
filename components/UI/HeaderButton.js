import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const CustomHeaderButton = props => {
    return <HeaderButton 
    {...props} 
    IconComponent={Ionicons} 
    iconSize={23} 
    color={Platform.OS === 'android' ? 'white' : Colors.blue12} />
}

export default CustomHeaderButton;