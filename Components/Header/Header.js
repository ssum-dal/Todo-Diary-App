import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const s = StyleSheet.create({
    HeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
});

function Header({title, navigation}) {
    return (
        <View style={s.HeaderView}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.goBack()}
            >
                <Icon name="chevron-back" color="#000000" size={30} style={{padding:5}}/>
            </TouchableOpacity>
            <Text>{title}</Text>
            <Icon name="chevron-back" color="#ffffff" size={30}/>
        </View>
    );
}

export default Header;