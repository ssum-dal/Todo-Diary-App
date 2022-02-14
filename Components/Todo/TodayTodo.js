import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import TodoList from "./TodoList";

const s = StyleSheet.create({
    ProjectTitle: {
        marginVertical: '3%',
        marginHorizontal: '4%'
    },
    TitleText: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});

function TodayTodo({projectData, projectIndex, today, navigation}) {
    const workData = useSelector(state=>state.project.project[projectIndex].works);

    const renderTodo = ({item}) => {
        return (
            <>
            {!item.isCompleted && (today ? item.isToday : !item.isToday) &&
                <TodoList
                    title={item.title}
                    isCompleted={item.isCompleted}
                    projectIndex = {projectIndex}
                    workId = {item.id}
                    isToday = {item.isToday}
                    deadline = {item.deadline}
                    navigation = {navigation}
                />
            }
            </>
        );
    }

    return (
        <>
            <View style={s.ProjectTitle}>
                <Text style={s.TitleText}>{projectData.title}</Text>
            </View>
            <FlatList
                data={workData}
                renderItem={renderTodo}
                keyExtractor={(item, index) => String(item.id)+String(index)}
            />
        </>
    )
    
}

export default TodayTodo;