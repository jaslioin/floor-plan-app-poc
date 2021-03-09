import { NavigationContainer ,} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './src/views/Home';
import { Z_INDEX_CONFIG } from './src/constants';
import { useState } from 'react';
const Tab = createBottomTabNavigator();
const ZOOM_LEVELS=[0.5,0.75,1,1.25,1.5]
export default function App() {  
  const [zoomLevel,setZoomLevel]=useState(0)
  function increaseZoom(){
    if(ZOOM_LEVELS[zoomLevel+1]){
      setZoomLevel(zoomLevel+1)
    }
  }
  function decreaseZoom(){
    if(ZOOM_LEVELS[zoomLevel-1]){
      setZoomLevel(zoomLevel-1)
    }
  }
  return (
    <View style={styles.container}>
      <Home zoomLevel={ZOOM_LEVELS[zoomLevel]}/>
        {/* <NavigationContainer>
        <Tab.Navigator
							// initialRouteName={BOTTOM_TAB_NAME.MY_PROFILE}
							screenOptions={
                ({ route }) => ({
                  // tabBarIcon: ({ focused, color, size }) => {
                  //   if (
                  //     route.name === BOTTOM_TAB_NAME.AGENT_LIST ||
                  //     route.name === BOTTOM_TAB_NAME.CLIENT_LIST
                  //   ) {
                  //     return (
                  //       <Image
                  //         source={require("./src/asset/icon/people_48x48.png")}
                  //       />
                  //     );
                  //   } else if (route.name === BOTTOM_TAB_NAME.CHAT) {
                  //     return (
                  //       <Image
                  //         source={require("./src/asset/icon/chat_48x48.png")}
                  //       />
                  //     );
                  //   } else if (route.name === BOTTOM_TAB_NAME.MY_PROFILE) {
                  //     return (
                  //       <Image
                  //         source={require("./src/asset/icon/profile_48x48.png")}
                  //       />
                  //     );
                  //   }
                  // },
                  unmountOnBlur:false
                    // Platform.OS === "android" &&
                    // (route.name === BOTTOM_TAB_NAME.AGENT_LIST ||
                    // 	route.name === BOTTOM_TAB_NAME.CLIENT_LIST),
                })
              }
							tabBarOptions={{
								// activeTintColor: color.main,
								// inactiveTintColor: color.main,
								// showLabel: false,
								// activeBackgroundColor: color.main,
								// inactiveBackgroundColor: color.main,
								// style: {
								// 	display: state.isBottomTabDisplay ? "flex" : "none",
								// },
							}}
						>
							<Tab.Screen
								name={"HI"}
								component={Home}
								screenOptions={{}}
							/>
							<Tab.Screen
								name={"Ho"}
								component={Home}
								screenOptions={{}}
							/>
						</Tab.Navigator>
        </NavigationContainer> */}
        <View style={{position:'absolute',zIndex:Z_INDEX_CONFIG.HIGHEST,backgroundColor:'orange',height:100,width:100 ,top:Dimensions.get('screen').height/2,left:0,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <TouchableOpacity onPress={increaseZoom}>
            <Text style={{fontSize:32}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={decreaseZoom}>
            <Text style={{fontSize:32}}>-</Text>
          </TouchableOpacity>

        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
