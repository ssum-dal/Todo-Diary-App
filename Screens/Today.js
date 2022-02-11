import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../Components/Header/Header";
import AddWork from "../Components/Todo/AddWork";
import TodoList from "../Components/Todo/TodoList";

const s = StyleSheet.create({
    TodayView: {
        flex: 1,
    },
    TodoView: {
        marginVertical: 10
    },
    TodoText: {
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 5
    }
});

const work = [
    {id: 1, title: '할일 1'}
]

function Today({navigation}) {
    const [workList, setWorkList] = useState(work);

    const renderTodo = ({item}) => {
        return (
            <TodoList 
                title={item.title}
            />
        );
    }

    const addWork = (title) => {
        const newWork = {
			id: 3,
			title: title
		}
		setWorkList(prev => [
			...prev,
			newWork
		]);
    }
    
    return (
        <View style={s.TodayView}>
            <Header title={'오늘'} navigation={navigation}/>
            <FlatList
                ListHeaderComponent={
                    <>
                    <AddWork addWork={addWork}/>
                    <View style={s.TodoView}>
                        <Text style={s.TodoText}>할 일</Text>
                        <FlatList
                            data={workList}
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

export default Today;