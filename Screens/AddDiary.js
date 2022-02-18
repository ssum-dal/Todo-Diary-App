import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { findDayofWeek } from "../Utils/DateFormat";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { requestAddDiary } from "../Context/Reducer/diaryReducer";

const s = StyleSheet.create({
    AddDiaryView: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    HeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%'
    },
    HeaderIconView: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
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
    TextInputView: {
        marginHorizontal: '2%'
    },
    ModalView: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: '50%',
    },
    ModalEmojiView: {
        flex: 1, 
        alignItems: 'center',
        paddingVertical: '4%'
    }
});

const EmojiData = [
    {id: 1, emoji: '😃'},
    {id: 2, emoji: '☹️'},
    {id: 3, emoji: '🤬'},
    {id: 4, emoji: '😭'},
]

function AddDiary ({navigation, route}) {
    const dispatch = useDispatch();
    const date = route.params.date;
    const [textValue, setTextValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [emotion, setEmotion] = useState('😃');

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    const renderEmoji = ({item}) => {
        return (
            <TouchableOpacity 
                style={s.ModalEmojiView}
                onPress={() => {
                    setEmotion(item.emoji)
                    setIsVisible(false)
                }}
            >
                <Text style={s.Emoji}>{item.emoji}</Text>
            </TouchableOpacity>
        );
    }

    const addDiary = () => {
        const newDiary = {
            id: date,
            content: textValue,
            emoji: emotion
        }
        dispatch(requestAddDiary(newDiary));
    }

    return (
        <ScrollView style={s.AddDiaryView}>
            <View style={s.HeaderView}>
                <TouchableOpacity
                    style={s.HeaderIconView}
                    onPress={() =>  navigation.goBack()}
                >
                    <Icon name="close" size={30} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.HeaderIconView}
                    onPress={() => {
                        addDiary();
                        navigation.goBack();
                    }}
                >
                    <Text style={{fontSize: 16}}>완료</Text>
                </TouchableOpacity>
            </View>
            <View style={s.DateView}>
                <TouchableOpacity
                    onPress={() => setIsVisible(true)}
                >
                    <Text style={s.Emoji}>{emotion}</Text>
                </TouchableOpacity>
                <Text style={s.DateText}>{`${year}년 ${month}월 ${day}일`}</Text>
                <Text>{findDayofWeek(date)}</Text>
            </View>
            <View style={s.TextInputView}>
                <TextInput
                    placeholder="내용을 입력하세요"
                    value={textValue}
                    onChangeText={(text) => {
                        setTextValue(text);
                    }}
                    multiline={true}
                />
            </View>
            <Modal 
                isVisible={isVisible}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
				backdropTransitionOutTiming={0}
				onBackButtonPress={() => {setIsVisible(false)}}
				onBackdropPress={() => {setIsVisible(false)}}
                style={{alignItems: 'center'}}
            >
                <View style={s.ModalView}>
                    <FlatList
                        numColumns={3}
                        data={EmojiData}
                        renderItem={renderEmoji}
                        keyExtractor={(item)=> String(item.id)}
                    />
                </View>
            </Modal>      
        </ScrollView>
    )
}

export default AddDiary;