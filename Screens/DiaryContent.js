import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { findDayofWeek } from "../Utils/DateFormat";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { requestDeleteDiary } from "../Context/Reducer/diaryReducer";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const s = StyleSheet.create({
    DiaryContentView: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    HeaderView: {
        marginHorizontal: '2%',
        marginTop: '2%',
        alignItems: 'flex-end'
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
    },
    ModalView: {
        backgroundColor: '#ffffff',
        width: '20%',
        height: '10%',
        justifyContent: 'center'
    },
    ModalText: {
        fontSize: 16,
        textAlign: 'center',
        padding: '2%'
    }
});

function DiaryContent({navigation, route}) {
    const dispatch = useDispatch();
    const isFoucused = useIsFocused();
    const [isVisible, setIsVisible] = useState(false);
    let data = route.params.data;
    const year = data.id.slice(0, 4);
    const month = data.id.slice(5, 7);
    const day = data.id.slice(8, 10);

    const deleteDiary = () => {
        dispatch(requestDeleteDiary(data.id));
    }

    useEffect(() => {
        data = route.params.data;
    }, [isFoucused]);

    return (
        <View style={s.DiaryContentView}>
            <View style={s.HeaderView}>
                <TouchableOpacity 
                    style={{padding: '1%'}}
                    activeOpacity={1}
                    onPress={() => setIsVisible(true)}
                >
                    <Icon name='ellipsis-vertical' color='#000000' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={s.DateView}>
                <Text style={s.Emoji}>{data.emoji}</Text>
                <Text style={s.DateText}>{`${year}년 ${month}월 ${day}일`}</Text>
                <Text>{findDayofWeek(data.id)}</Text>
            </View>
            <View style={s.ContentView}>
                <Text style={s.ContentText}>{data.content}</Text>
            </View>
            <Modal 
                isVisible={isVisible}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
				backdropTransitionOutTiming={0}
				onBackButtonPress={() => {setIsVisible(false)}}
				onBackdropPress={() => {setIsVisible(false)}}
                style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}
            >
                <View style={s.ModalView}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('AddDiary', {
                                isEditing: true,
                                date: data.id,
                                content: data.content,
                                emoji: data.emoji
                            });
                            setIsVisible(false);
                        }}
                    >
                        <Text style={s.ModalText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            deleteDiary();
                            navigation.goBack();
                        }}
                    >
                        <Text style={s.ModalText}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </Modal>  
        </View>
    )
}

export default DiaryContent;