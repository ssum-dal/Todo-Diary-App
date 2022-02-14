import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import AddWork from "../Components/Todo/AddWork";
import TodayTodo from "../Components/Todo/TodayTodo";

const s = StyleSheet.create({
    UpcomingView: {
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

function Upcoming({navigation}) {
    const projectData = useSelector(state => state.project.project);

    const renderTodo = ({item, index}) => {
        return (
            <TodayTodo
                projectData={item}
                projectIndex={index}
                navigation={navigation}
                today={false}
            />
        );
    }
    
    return (
        <View style={s.UpcomingView}>
            <Header title={'추후'} navigation={navigation}/>
            <FlatList
                ListHeaderComponent={
                    <>
                    <AddWork 
                        navigation={navigation}
                        index={0}
                    />
                    <View style={s.TodoView}>
                        <FlatList
                            data={projectData}
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

export default Upcoming;