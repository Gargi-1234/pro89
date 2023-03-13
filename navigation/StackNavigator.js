import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./TabNavigator.js"
import PostScreen from '../screens/PostScreen.js';

const Stack = createStackNavigator()

const StackNavigator =()=>{
    return(
        <StackNavigator
            initialRouteName = "Home"
            screenOptions={{
                headerShown : false
            }}
        >
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="PostScreen" component={PostScreen}/>
        </StackNavigator>
    )
}

export default StackNavigator;