import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import Feed from "../screens/Feed";
import CreatePost from '../screens/CreatePost';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            labeled={false}
            barStyle={
                this.state.light_theme
                  ? styles.bottomTabStyleLight
                  : styles.bottomTabStyle
              }
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'CreatePost') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    return (
                    <Ionicons 
                     style={styles.icons}
                     name={iconName} 
                     size={RFValue(25)} 
                     color={color} 
                     />
                    )
                }
            })}
           
                activeColor ={ 'tomato'}
                inactiveColor ={'gray'} 
            
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="CreatePost" component={CreatePost}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#2f345d",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute"
    },
    bottomTabStyleLight: {
      backgroundColor: "#eaeaea",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute"
    },
    icons: {
      width: RFValue(30),
      height: RFValue(30)
    }
  });
  

export default TabNavigator ;