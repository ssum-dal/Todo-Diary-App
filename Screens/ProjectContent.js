import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import AddWork from "../Components/Todo/AddWork";
import TodoList from "../Components/Todo/TodoList";

const s = StyleSheet.create({
    ProjectContentView: {
        flex: 1,
    },
    TodoView: {
        marginVertical: 10
    },
});

function ProjectContent({navigation, route}) {
    const data = route.params.data;
    const index = route.params.index;
    const workData = useSelector(state => state.project.project[index].works);

    const renderTodo = ({item}) => {
        return (
            <TodoList 
                title={item.title}
                isCompleted={item.isCompleted}
                projectIndex = {index}
                workId = {item.id}
                isToday = {item.isToday}
                deadline = {item.deadline}
                navigation = {navigation}
            />
        );
    }
    
    return (
        <View style={s.ProjectContentView}>
            <Header title={data.title} navigation={navigation}/>
            <FlatList
                ListHeaderComponent={
                    <>
                    <AddWork 
                        navigation={navigation}
                        index={index}
                    />
                    <View style={s.TodoView}>
                        <FlatList
                            data={workData}
                            renderItem={renderTodo}
                            keyExtractor={(item) => String(item.id)}
                        />
                    </View>
                    </>
                }    
            />
        </View>
    );
}

export default ProjectContent;