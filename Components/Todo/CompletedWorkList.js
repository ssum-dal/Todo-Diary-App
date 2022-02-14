import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";
import { requestUpdateComplete } from "../../Context/Reducer/projectReducer";
import { dateToString } from "../../Utils/DateFormat";

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
        fontSize: 15,
        color: '#d2d2d2',
        textDecorationLine: 'line-through'
    }
});

function CompletedWorkList({title, isCompleted, projectIndex, workId, isToday, deadline, navigation}) {
    const [isChecked, setChecked] = useState(isCompleted);
    const dispatch = useDispatch();

    return (
        <View style={s.ListView}>
            <CheckBox
                value={isChecked}
                onValueChange={(v) => {
                    setChecked(v)
                    dispatch(requestUpdateComplete(projectIndex, workId, v))
                }}
                style={s.CheckBoxView}
            />
            <View style={{flex: 1}}>
                <TouchableOpacity 
                    activeOpacity={1}
                    style={{flex: 1, justifyContent:'center'}}
                    onPress={() => {
                        navigation.push('AddWork', {
                            isEditing: true,
                            projectIndex: projectIndex,
                            workId: workId,
                            workName: title,
                            deadline: deadline,
                            isCompleted: isCompleted
                        })
                    }}
                >
                    <Text style={s.TextView}>{title}</Text>
                    <Text>{isToday ? '오늘' : dateToString(new Date(deadline))}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CompletedWorkList;
