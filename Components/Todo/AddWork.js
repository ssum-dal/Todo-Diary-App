import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const s = StyleSheet.create({
    AddWork: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 10,
    },
});

function AddWork({addWork}) {
    const [textValue, setTextValue] = useState('');

    return (
        <View style={s.AddWork}>
            <TouchableOpacity
                onPress={() => {
                    addWork(textValue)
                    setTextValue('')
                }}
            >
                <Icon name="add" color="#000000" size={30}/>
            </TouchableOpacity>
            <TextInput 
                placeholder="작업 추가"
                value={textValue}
                onChangeText={(text) => setTextValue(text)}
                maxLength={20}
            />
        </View>
    );
}

export default AddWork;