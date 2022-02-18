import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { findDayofWeek } from "../Utils/DateFormat";

const s = StyleSheet.create({
    DiaryContentView: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    Emoji: {
        fontSize: 30,
        color: '#000000'
    },
    DateView: {
        alignItems: 'center',
        marginVertical: '5%'
    },
    DateText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    ContentView: {
        marginHorizontal: '3%',
        marginVertical: '3%'
    },
    ContentText: {
        fontSize: 20
    }
});

function DiaryContent({navigation, route}) {
    const data = route.params.data;

    const year = data.id.slice(0, 4);
    const month = data.id.slice(5, 7);
    const day = data.id.slice(8, 10);

    return (
        <View style={s.DiaryContentView}>
            <View style={s.DateView}>
                <Text style={s.Emoji}>{data.emoji}</Text>
                <Text style={s.DateText}>{`${year}년 ${month}월 ${day}일`}</Text>
                <Text>{findDayofWeek(data.id)}</Text>
            </View>
            <View style={s.ContentView}>
                <Text style={s.ContentText}>{data.content}</Text>
            </View>
        </View>
    )
}

export default DiaryContent;