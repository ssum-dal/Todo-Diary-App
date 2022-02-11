import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const s = StyleSheet.create({
    ListView: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginHorizontal: 5,
        marginBottom: 5
    },
    CheckBoxView: {
        marginHorizontal: 5
    },
    TextView: {
        fontSize: 15
    }
});

function TodoList({title}) {
    const [isCompleted, setCompleted] = useState(false);

    return (
        <View style={s.ListView}>
            <CheckBox
                value={isCompleted}
                onValueChange={(v) => setCompleted(v)}
                style={s.CheckBoxView}
            />
            <Text style={s.TextView}>{title}</Text>
        </View>
    );
}

export default TodoList;