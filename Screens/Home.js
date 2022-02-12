import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { requestDeleteProject } from "../Context/Reducer/projectReducer";

const s = StyleSheet.create({
	Home: {
	  flex: 1,
	  backgroundColor: '#f9f9f9'
	},
  	TopView: {

  	},
  	ProjectView: {

  	},
  	SubItem: {
    	flexDirection: 'row',
    	alignItems: 'center',
		height: 60,
		paddingHorizontal: 5
  	},
  	SwipeList: {
		flexDirection: 'row',
    	alignItems: 'center',
		height: 60,
		paddingHorizontal: 5,
    	backgroundColor: '#f9f9f9',
  	},
  	SwipeHiddenItemContainer: {
    	flex: 1,
    	height: '100%',
    	justifyContent: 'flex-end',
    	alignItems: 'center',
    	backgroundColor: '#f9f9f9',
    	flexDirection: 'row',
  	},
  	SwipeHiddenItem: {
    	width: 60,
    	height: '100%',
    	justifyContent: 'center',
    	alignItems: 'center',
  	},
  	SwipeHiddenItemText: {
  		color: 'white',
  		fontSize: 14,
  	},
  	AddProject: {
  	  	flexDirection: 'row',
  	  	alignItems: 'center'
  	},
	TextView: {
		fontSize: 18,
		marginHorizontal: 15
	}
});

function Home({navigation}) {
	const projectData = useSelector(state => state.project.project);
	const dispatch = useDispatch();

	const deleteProject = (id) => {
		dispatch(requestDeleteProject(id));
	}

	return (
    <>
    <FlatList
    	style={s.Home}
        ListHeaderComponent={
        	<>
        	<View style={s.TopView}>
            	<TouchableOpacity
					activeOpacity={1}
                	style={s.SubItem}
                	onPress={() => navigation.push('Today')}
              	>
                	<Icon name='sunny' color='#CDF0EA' size={30} />
                	<Text style={s.TextView}>오늘</Text>
              	</TouchableOpacity>
              	<TouchableOpacity
				  	activeOpacity={1}
                	style={s.SubItem}
                	onPress={() => navigation.push('Upcoming')}
              	>
                	<Icon name='calendar' color='#BEAEE2' size={30} />
                	<Text style={s.TextView}>추후</Text>
              	</TouchableOpacity>
            </View>
            <View style={s.ProjectView}>
              	<SwipeListView
                	data={projectData}
                	renderItem={(data, rowMap) => (
						<TouchableOpacity
							activeOpacity={1}
							style={s.SwipeList}
							onPress={() => {
								const index = projectData.findIndex((v) => v.id === data.item.id)
								navigation.push('ProjectContent', { data: data.item, index: index }
							)}}
						>
							<Icon name="ellipse" color="#F7DBF0" size={25}/>
                    		<Text 
								style={s.TextView} 
								numberOfLines={1} 
								ellipsizeMode="tail"
							>
								{data.item.title}
							</Text>
						</TouchableOpacity>
                	)}
                	renderHiddenItem={(data, rowMap) => (
                  		<View style={s.SwipeHiddenItemContainer}>
                    		<TouchableOpacity
                      			onPress={() => {
									
									navigation.push('AddProject', {
									  	isEditing: true,
									  	projectName: data.item.title,
										projectId: data.item.id
								  	})}
								}
							>
                      		<View style={[s.SwipeHiddenItem, { backgroundColor: 'skyblue' }]}>
                        		<Text style={s.SwipeHiddenItemText}>수정</Text>
                      		</View>
                    		</TouchableOpacity>
                    		<TouchableOpacity
                      			onPress={() => deleteProject(data.item.id)}
							>
                      			<View style={[s.SwipeHiddenItem, { backgroundColor: 'red' }]}>
                        			<Text style={s.SwipeHiddenItemText}>삭제</Text>
                      			</View>
                    		</TouchableOpacity>
                  		</View>
                	)}
                	disableRightSwipe={true}
                	rightOpenValue={-120}
              	/>
            </View>
            <TouchableOpacity
				style={s.SubItem}
				activeOpacity={1}
            	onPress={() => navigation.push('AddProject', {
					isEditing: false,
					projectName: '',
					projectId: null
				})}
            >
            	<View style={s.AddProject}>
                	<Icon name='add' color='#000000' size={30} />
                	<Text style={s.TextView}>프로젝트 추가</Text>
              	</View>
            </TouchableOpacity>
        	</>}
      />
    </>);
}

export default Home;