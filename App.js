import React from 'react';
import "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import appStore from './Context/appStore';
import { Provider } from 'react-redux';
import Home from "./Screens/Home";
import Today from "./Screens/Today";
import Upcoming from "./Screens/Upcoming";
import ProjectContent from "./Screens/ProjectContent";
import AddProject from "./Screens/AddProject";
import AddWork from "./Screens/AddWork";
import Diary from "./Screens/Diary";
import AddDiary from "./Screens/AddDiary";
import DiaryContent from "./Screens/DiaryContent";

const Stack = createStackNavigator();

const App = () => {
	return (
		<Provider store={appStore}>
			<NavigationContainer>
      			<Stack.Navigator 
        			initialRouteName="Home"
        			screenOptions={{
        	  			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        			}}
      			>
        			<Stack.Screen 
						name="Home" 
						component={Home} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
        			<Stack.Screen 
						name="Today" 
						component={Today} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
        			<Stack.Screen 
						name="Upcoming" 
						component={Upcoming} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="ProjectContent" 
						component={ProjectContent} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="AddProject" 
						component={AddProject} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="AddWork" 
						component={AddWork} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="Diary" 
						component={Diary} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="AddDiary" 
						component={AddDiary} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
					<Stack.Screen 
						name="DiaryContent" 
						component={DiaryContent} 
						options={{headerShown: false, gestureEnabled: true}}
					/>
      			</Stack.Navigator>
    		</NavigationContainer>
		</Provider>
  	)
}

const styles = StyleSheet.create({
	container: {
    	flex : 1,
	}
});

export default App;