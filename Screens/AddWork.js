import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Touchable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import { requestAddWork, requestDeleteWork, requestUpdateWork } from "../Context/Reducer/projectReducer";
import { useDispatch } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateToString, isToday } from "../Utils/DateFormat";

const s = StyleSheet.create({
    AddWorkView: {
        flex: 1,
    },
    HeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '7%',
        backgroundColor: '#ffffff'
    },
    TextView: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    AddView: {
        padding: 10, 
    },
    AddText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000'
    },
    AddDisabled: {
        fontSize: 15,
        textAlign: 'center',
        color: '#c2c2c2'
    },
    TextInputView: {
        backgroundColor: '#ffffff',
        height: '8%',
        marginVertical: '4%',
        justifyContent: 'center'
    },
    DeadlineView: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    DeadlineTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    DeadlineText: {
        fontSize: 16,
        color: '#000000',
        marginHorizontal: '3%'
    },
    DeadlineDate: {
        padding: 5
    },
    DeleteWorkView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '25%'
    }
});

function AddWork({navigation, route}) {
    const isEditing = route.params.isEditing;
    const projectIndex = route.params.projectIndex;
    const workId = route.params.workId;
    const workName = route.params.workName;
    const deadline = route.params.deadline ? new Date(route.params.deadline) : new Date();
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(true);
    const [textValue, setTextValue] = useState(workName);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(deadline);
    const [today, setToday] = useState(isToday(deadline));
    
    const addWork = (title) => {
        const newWork = {
			id: uuid.v4(),
			title: title,
            isToday: today,
            isCompleted: false,
            deadline: date.toISOString(),
		}

        dispatch(requestAddWork(newWork, projectIndex));
    }

    const updateWork = (title) => {

        dispatch(requestUpdateWork(projectIndex, workId, title, today, date.toISOString()));
    }
    

    const updateAddButton = (text) => {
        if (text.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setTextValue(text)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setToday(isToday(currentDate));
        updateAddButton(textValue);
      };

    return (
        <View style={s.AddWorkView}>
            <View style={s.HeaderView}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-back" color="#000000" size={30} style={{padding:5}}/>
                </TouchableOpacity>
                <Text style={s.TextView}>{isEditing ? '작업 수정' : '작업 추가'}</Text>
                <TouchableOpacity
                    style={s.AddView}
                    disabled={disabled}
                    activeOpacity={1}
                    onPress={() => {
                        if (isEditing) {
                            updateWork(textValue)
                        } else {
                            addWork(textValue)
                        }
                        setTextValue('')
                        navigation.goBack()
                    }}
                >
                    <Text style={disabled ? s.AddDisabled : s.AddText}>완료</Text>
                </TouchableOpacity>
            </View>
            <View style={s.TextInputView}>
                <TextInput
                    placeholder="작업 이름"
                    value={textValue}
                    onChangeText={(text) => {
                        updateAddButton(text)
                    }}
                    maxLength={20}
                />
            </View>
            <TouchableOpacity
                activeOpacity={1}
                style={s.DeadlineView}
                onPress={() => setShow(true)}
            >
                <View style={s.DeadlineTextView}>
                    <Icon name='calendar' color='#d2d2d2' size={25}/>
                    <Text style={s.DeadlineText}>마감일</Text>
                </View>
                <View style={s.DeadlineDate}>
                    <Text>{today ? '오늘' : dateToString(date)}</Text>
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    minimumDate={new Date()}
                    onChange={onChange}
                />
            )}
        
            {isEditing &&
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(requestDeleteWork(projectIndex, workId));
                        navigation.goBack();
                    }}
                >
                    <View style={s.DeleteWorkView}>
                        <Icon name="trash" color='#000' size={30}/>
                    </View>
                </TouchableOpacity>
            </View>
            }        
        </View>
    );
}

export default AddWork;