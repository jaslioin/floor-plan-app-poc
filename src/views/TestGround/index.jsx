import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, View ,Easing,Animated,Text} from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';
import AnchorPointDemo from './AnchorPointDemo';




const CARD_WIDTH=100
const CARD_HEIGHT=100

export default function TestGround (props){
    const [isVisible,setVisible]=useState(false)
    const [myX,setX]=useState(1);
    const [rotateValue,setRotate]=useState('0deg')
    function handlePlus(){
        setX(myX*1.1)
    }
    function handleMinus(){
        setX(myX*1/1.1)

    }
    
        
    return(
        <View style={{
            backgroundColor:'pink',
            height:'100%',
            width:'100%',
            justifyContent:'center'
        }}>
            {/* <AnchorPointDemo/> */}
            <Child x={myX} y={300}/>
            <Button title="Plus" onPress={handlePlus}/>
            <Button title="Minus" onPress={handleMinus}/>
        </View>)
}
function Child({x=100,y=100}){
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const yAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = (valX,valY) => {
        // Will change ·fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: valX,
            duration: 500,
            useNativeDriver:true
        }).start(); 
        Animated.timing(yAnim, {
            toValue: valY,
            duration: 500,
            useNativeDriver:true

        }).start();
    };
    useEffect(()=>{
        fadeIn(x,y)
    },[x])
    const getTransform = () => {
        let transform = {
            transform: [{ perspective: 400 }, { scale: fadeAnim }],
        };
        return withAnchorPoint(transform, { x: 0, y: 0 }, { width: CARD_WIDTH, height: CARD_HEIGHT });
    };
    return(
        <Animated.View style={[{backgroundColor:'red',height:CARD_HEIGHT,width:CARD_WIDTH}, getTransform()]} />
            // <Animated.View
            //     style={[
            //         {
            //             transform: [
            //                 {
            //                     translateX:fadeAnim,
            //                 },
            //                 {
            //                     translateY:yAnim
            //                 }
            //             ], // Bind opacity to animated value
            //             // top:fadeAnim
            //         }
            //     ]}
            // >
            //     <Text>Fading View!</Text>
            // </Animated.View>            
    )    
}