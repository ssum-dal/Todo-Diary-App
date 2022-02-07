import React from 'react';
import "react-native-gesture-handler";
import {StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Home from "./Screens/Home";
import Today from "./Screens/Today";
import Upcoming from "./Screens/Upcoming";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
      		<Stack.Navigator 
        		initialRouteName="Home"
        		screenOptions={{
          			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        		}}
      		>
        		<Stack.Screen name="Home" component={Home} options={{headerShown: false, gestureEnabled: true}}/>
        		<Stack.Screen name="Today" component={Today} options={{headerShown: false, gestureEnabled: true}}/>
        		<Stack.Screen name="Upcoming" component={Upcoming} options={{headerShown: false, gestureEnabled: true}}/>
      		</Stack.Navigator>
    	</NavigationContainer>
  	)
}

const styles = StyleSheet.create({
	container: {
    	flex : 1,
	}
});

export default App;