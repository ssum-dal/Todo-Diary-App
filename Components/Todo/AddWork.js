import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const s = StyleSheet.create({
    AddWork: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginVertical: '5%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginHorizontal: 5,
    },
    TextView: {
        fontSize: 16,
        marginHorizontal: '3%'
    }
});

function AddWork({navigation, index}) {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                navigation.push('AddWork', {
                    isEditing: false,
                    projectIndex: index,
                    workId: null,
                    workName: ''
                })
            }}
        >
            <View style={s.AddWork}>
                <Icon name="add" color="#000000" size={30}/>
                <Text style={s.TextView}>작업 추가</Text>
            </View>
        </TouchableOpacity>
    );
}

export default AddWork;