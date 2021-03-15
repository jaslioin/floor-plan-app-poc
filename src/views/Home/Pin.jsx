import React from 'react';
import { useRef } from 'react';
import { useEffect ,useState,useMemo} from 'react';
import { View ,Text, Dimensions, Image, ScrollView, TouchableOpacity, Button, TouchableHighlight} from 'react-native';
import { Easing,Animated} from 'react-native';

import { Z_INDEX_CONFIG } from '../../constants';
import { generateRandomPin } from '../../utils';
const sources=[
    require('../../assets/img/floorplan.png'),
    require('../../assets/img/2.png')
]

const pinSrc=require('../../assets/img/pin.png')
const IMAGE_OFFSET={
    x:100,
    y:100
}

export default function Pin({id=null,x=0,y=0,onPress}){
    const xAnime = useRef(new Animated.Value(0)).current;
    const yAnime = useRef(new Animated.Value(0)).current;
    

    const moveX = (toX=0) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(xAnime, {
            toValue: toX,
            bounciness:16,
            duration: 1000,
            useNativeDriver:true,
            easing:Easing.cubic
        }).start(); 
    };
    const moveY = (toY=0) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(yAnime, {
            toValue: toY,
            duration: 1000,
            bounciness:16,
            useNativeDriver:true,
            easing:Easing.cubic

        }).start(); 
    };
    useEffect(() => {
        // console.log(x,y);
        moveX(x-25 +IMAGE_OFFSET.y);
        moveY(y-50 +IMAGE_OFFSET.x);        
    }, [x,y])
    useEffect(()=>{
        // console.log('anime',xAnime,yAnime);
    },[xAnime,yAnime])
    return(
        <View
            style={{
                position:'absolute',
                zIndex:Z_INDEX_CONFIG.HIGHEST,
            }}
        >
            
            {/* <Animated.Text style={[{
                color:'red',
                backgroundColor:'white',
                // top:x+IMAGE_OFFSET.x,
                // left:y-75+IMAGE_OFFSET.y,
                transform:[
                    {
                        translateX:xAnime
                    },
                    {
                        translateY:yAnime
                    }
                ],                
                position:'absolute',
                textAlign:'center',
                width:100,
            }]}>
                {id}:({x},{y})
            </Animated.Text> */}
            <TouchableOpacity onPress={onPress} 

            >
                <Animated.View
                style={{
                    // top:y-50 +IMAGE_OFFSET.y,
                    // left:x-25 +IMAGE_OFFSET.x,
                    // backgroundColor:'red',
                    transform:[
                        {
                            translateX:xAnime
                        },
                        {
                            translateY:yAnime
                        }
                    ],                
                    width:50,
                    height:50,
                    position:'absolute'
                }}                 
                >
                    <Image 
                        source={pinSrc}
                        style={{
                            width:50,
                            height:50,
                        }}
                        resizeMode='contain'
                    />
                </Animated.View>
            </TouchableOpacity>

        </View>
    )
}