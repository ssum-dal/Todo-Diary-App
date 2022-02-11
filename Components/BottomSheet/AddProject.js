import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const s = StyleSheet.create({
    TextInputView: {
        borderWidth : 1,
        borderColor: '#c2c2c2'
    },
    AddView: {
        alignItems: 'center'
    },
    AddButton: {
        backgroundColor: 'yellow',
        width: '30%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

function AddProject({bottomSheet, addProject}) {
    const [textValue, setTextValue] = useState('');
    const [disabled, setDisabled] = useState(true);

    const updateAddButton = (text) => {
        if (text.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setTextValue(text)
    }

    return (
        <RBSheet
            ref={bottomSheet}
            height={400}
            closeOnDragDown={true}
            keyboardAvoidingViewEnabled={true}
            customStyles={{
                draggableIcon: {
                    backgroundColor: "#999999"
                },
                container: {
                    borderTopRightRadius:20,
                    borderTopLeftRadius: 20,
                }
            }}
        >
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
            <View style={s.AddView}>
            <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                    bottomSheet.current.close()
                    addProject(textValue)
                    setTextValue('')
                }}
            >
                <View style={s.AddButton}>
                    <Text>추가</Text>
                </View>
            </TouchableOpacity>
            </View>
        </RBSheet>
    )
}

export default AddProject;