import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import AddWork from "../Components/Todo/AddWork";
import CompletedWorkList from "../Components/Todo/CompletedWorkList";
import TodoList from "../Components/Todo/TodoList";

const s = StyleSheet.create({
    ProjectContentView: {
        flex: 1,
    },
    TodoView: {
        marginVertical: 10
    },
    CompletedTextView: {
        marginVertical: '3%',
        marginHorizontal: '4%'
    },
});

function ProjectContent({navigation, route}) {
    const data = route.params.data;
    const index = route.params.index;
    const workData = useSelector(state => state.project.project[index].works);

    const renderTodo = ({item}) => {
        return (
            <>
            {!item.isCompleted &&
            <TodoList 
                title={item.title}
                isCompleted={item.isCompleted}
                projectIndex = {index}
                workId = {item.id}
                isToday = {item.isToday}
                deadline = {item.deadline}
                navigation = {navigation}
            />}
            </>
        );
    }

    const renderCompleted = ({item}) => {
        return (
            <>
            {item.isCompleted &&
                <CompletedWorkList
                    title={item.title}
                    isCompleted={item.isCompleted}
                    projectIndex = {index}
                    workId = {item.id}
                    isToday = {item.isToday}
                    deadline = {item.deadline}
                    navigation = {navigation}
                />
            }
            </>
        )
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
                            keyExtractor={(item, index) => String(index)+String(item.id)}
                            listKey={'todo'}
                        />
                        <FlatList
                            data={workData}
                            renderItem={renderCompleted}
                            keyExtractor={(item, index) => String(item.id)+String(index)}
                            listKey={'completed'}
                            ListHeaderComponent={
                                <View style={s.CompletedTextView}>
                                    <Text>완료 목록</Text>
                                </View>
                            }
                        />
                    </View>
                    </>
                }    
            />
        </View>
    );
}

export default ProjectContent;