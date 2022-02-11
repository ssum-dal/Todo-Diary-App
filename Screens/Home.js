import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AddProject from '../Components/BottomSheet/AddProject';

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

const project = [
	{id: 1, title: '할 일'},
]

function Home({navigation}) {
	let bottomSheet = useRef();
	const [projectData, setProjectData] = useState(project)

	const addProject = (title) => {
		const newProject = {
			id: 3,
			title: title
		}
		setProjectData(prev => [
			...prev,
			newProject
		]);
	}

	const deleteProject = (id) => {
		setProjectData(projectData.filter(item => item.id !== id))
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
                      			onPress={() => console.log(`${data.item.text} right is pressed`)}
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
            	onPress={() => bottomSheet.current.open()}
            >
            	<View style={s.AddProject}>
                	<Icon name='add' color='#000000' size={30} />
                	<Text style={s.TextView}>프로젝트 추가</Text>
              	</View>
            </TouchableOpacity>
        	</>}
      />
    <AddProject
    	bottomSheet={bottomSheet}
		addProject={addProject}
    />
    </>);
}

export default Home;