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
    const [disabled, setDisabled] = useState(true);

    const updateAddButton = (text) => {
        if (text.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setTextValue(text)
    }

    return (
        <View style={s.AddWork}>
            <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                    addWork(textValue)
                    setTextValue('')
                }}
            >
                <Icon name="add" color="#000000" size={30}/>
            </TouchableOpacity>
            <TextInput
                style={{width: '100%'}}
                placeholder="작업 추가"
                value={textValue}
                onChangeText={(text) => {
                    updateAddButton(text)
                }}
                maxLength={20}
            />
        </View>
    );
}

export default AddWork;