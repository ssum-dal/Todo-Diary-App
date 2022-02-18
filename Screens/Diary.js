import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Calendar, Agenda} from 'react-native-calendars';
import { useSelector } from "react-redux";

const s = StyleSheet.create({
    DiaryView: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

function Diary ({navigation}) {
    const diaryData = useSelector(state => state.diary.diary);
    
    return (
        <View style={s.DiaryView}>
            <Calendar
                monthFormat={'yyyy년 MM월'}
                enableSwipeMonths={true}
                hideExtraDays={true}
                dayComponent={({date, state}) => {
                    const diary = diaryData.filter(item => item.id === date.dateString);
                    
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (diary.length !== 0) {
                                    navigation.push('DiaryContent', {
                                        data: diary[0]
                                    })

                                } else {
                                    navigation.push('AddDiary', {
                                        date: date.dateString
                                    })
                                }
                            }}
                        >
                            <View style={{height: 100}}>
                                <Text>{diary.length !== 0 ? diary[0].emoji : date.day}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Diary;