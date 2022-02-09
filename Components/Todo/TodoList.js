import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const s = StyleSheet.create({
    ListView: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    }
});

function TodoList({title}) {
    const [isCompleted, setCompleted] = useState(false);

    return (
        <View style={s.ListView}>
            <CheckBox
                value={isCompleted}
                onValueChange={(v) => setCompleted(v)}
            />
            <Text>{title}</Text>
        </View>
    );
}

export default TodoList;