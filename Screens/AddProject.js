import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import { useDispatch } from "react-redux";
import { requestAddProject, requestUpdateProject } from "../Context/Reducer/projectReducer";

const s = StyleSheet.create({
    AddProjectView: {
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
    }
});

function AddProject({navigation, route}) {
    const isEditing = route.params.isEditing;
    const projectName = route.params.projectName;
    const projectId = route.params.projectId;
    const [textValue, setTextValue] = useState(projectName);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    const addProject = (title) => {
		const newProject = {
			id: uuid.v4(),
			title: title,
			works: [],
		}
		dispatch(requestAddProject(newProject));
	}

    const updateProject = (title) => {
        dispatch(requestUpdateProject(projectId, title));
    }

    const updateAddButton = (text) => {
        if (text.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setTextValue(text)
    }

    return (
        <View style={s.AddProjectView}>
            <View style={s.HeaderView}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="close" color="#000000" size={30} style={{padding:5}}/>
                </TouchableOpacity>
                <Text style={s.TextView}>{isEditing ? '프로젝트 수정' : '프로젝트 추가'}</Text>
                <TouchableOpacity
                    style={s.AddView}
                    disabled={disabled}
                    activeOpacity={1}
                    onPress={() => {
                        if (isEditing) {
                            updateProject(textValue)
                        } else {
                            addProject(textValue)
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
                    style={{marginHorizontal: 10}}
                    placeholder="새로운 프로젝트 이름"
                    maxLength={20}
                    onChangeText={(text) => {
                        updateAddButton(text)
                    }}
                    value={textValue}
                />
            </View>
        </View>
    );
}

export default AddProject;