import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Home from './src/views/Home';
import { Z_INDEX_CONFIG } from './src/constants';
import { useState } from 'react';
import { Button } from 'react-native-elements';
const ZOOM_LEVELS=[0.5,0.75,1,1.25,1.5]
export default function App() {  
  const [zoomLevel,setZoomLevel]=useState(0)
  const [isButtonDisabled,setButtonDisabled]=useState(false)
  function increaseZoom(){
    if(ZOOM_LEVELS[zoomLevel+1]){
      setZoomLevel(zoomLevel+1)
    }
  }
  function changeZoom(state){
    if(state==0 && ZOOM_LEVELS[zoomLevel-1]){
      setZoomLevel(zoomLevel-1)
    }
    if(state==1 && ZOOM_LEVELS[zoomLevel+1]){
      setZoomLevel(zoomLevel+1)
    }
    setButtonDisabled(true)
    setTimeout(()=>{
      setButtonDisabled(false)
    },200)
  }
  return (
    <View style={styles.container}>
      <Home zoomLevel={ZOOM_LEVELS[zoomLevel]}/>
        <View style={{position:'absolute',zIndex:Z_INDEX_CONFIG.HIGHEST,backgroundColor:'orange',height:100,width:100 ,top:Dimensions.get('screen').height/2,left:0,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Button onPress={()=>{changeZoom(1)}} disabled={isButtonDisabled} buttonStyle={{width:100,height:40}} type='solid' title='+'>
          </Button>
          <Button onPress={()=>{changeZoom(0)}} disabled={isButtonDisabled} buttonStyle={{width:100,height:40,backgroundColor:'red'}} type='solid'  title='-'>
          </Button>

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
