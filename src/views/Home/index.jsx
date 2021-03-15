import React from 'react';
import { useRef } from 'react';
import { useEffect ,useState,useMemo} from 'react';
import { View ,Text, Dimensions, Image, ScrollView, TouchableOpacity, Button, TouchableHighlight, Platform} from 'react-native';
import { Easing,Animated} from 'react-native';
import Pin from './Pin'
import { withAnchorPoint } from 'react-native-anchor-point';
import { generateRandomPin } from '../../utils';
const sources=[
    require('../../assets/img/floorplan.png'),
    require('../../assets/img/2.png')
]
const IMAGE_OFFSET={
    x:100,
    y:100
}

export default function Home ({zoomLevel=1}){
    const imgRef=useRef();
    const [imgSrc,setSrc]=useState()
    const [imgSpec,setImgSpec]=useState({})
    const [pinList,setPinList]=useState([])
    const demoPins=useRef([])
    const scaleFactor = useRef(new Animated.Value(0.5)).current;

    useEffect(()=>{
        setSrc(require('../../assets/img/2.png'))
    },[])

    useEffect(()=>{
        if(!imgSrc){
            return
        }
        if (Platform.OS === "web"){
            Image.resolveAssetSource =  source => { source }   
        }
        console.log(Image.resolveAssetSource(imgSrc));
        setImgSpec(Image.resolveAssetSource(imgSrc))
    },[imgSrc])
    useEffect(()=>{
        if(!imgSpec || Object.keys(imgSpec).length===0){
            return
        }
        if(demoPins.current.length===0){
            demoPins.current=randomPins(imgSpec)
            // demoPins.current=fourEdge(imgSpec)
        }
        const pins=demoPins.current.map(pin=>({
            ...pin,
            x:pin.x*zoomLevel,
            y:pin.y*zoomLevel,
        }))
        scaleTo(zoomLevel)
        setPinList(pins)
    },[imgSpec,zoomLevel])

    /** DEV FUNCTION */
    function changeImage(){
        const randomIndex=Math.round(Number(Math.random()*(sources.length-1).toFixed(0)))
        setSrc((sources[randomIndex]))
    }
    function onTouch(event){
        // console.log('Screen:',Dimensions.get('screen'));
        // console.log('Window:',Dimensions.get('window'));
        // console.log(event.nativeEvent.locationX,event.nativeEvent.locationY);
        // console.log(imgSpec);
        // console.log(imgRef.current);
    }
    function handlePinPress(pinObj){
        console.log("PRESSED",pinObj);
    }
    function scaleTo(multiplier){
        Animated.timing(scaleFactor, {
            toValue: multiplier,
            duration: 600,
            useNativeDriver:true
          }).start();
    }
    const getTransform = () => {
        let transform = {
            transform: [ { scale: scaleFactor }],
        };
        return withAnchorPoint(transform, { x: 0, y: 0 }, { width: imgSpec.width, height: imgSpec.height });
    };
    return(
        <ScrollView style={{
            backgroundColor:'pink',
            height:'100%',
            // width: imgSpec?.width|| 0,
            // height: imgSpec?.height || 0, 
        }}
            contentContainerStyle={{
                width: 'auto',
                // width: imgSpec?.width *zoomLevel|| 0,
                // height: imgSpec?.height *zoomLevel || 0, 
                height: 'auto', 
                paddingHorizontal:IMAGE_OFFSET.x,
                paddingVertical:IMAGE_OFFSET.y,
            }}
        >
            <View style={{position:'absolute',zIndex:1000,top:300,left:100}}>
                <Button title="CHANGE" onPress={changeImage}/>
            </View>
            {
                pinList.map((pin)=>{
                    return (       
                        <Pin key={pin.id} id={pin.id} x={pin.x} y={pin.y} onPress={()=>{handlePinPress(pin)}}/>            
                    )
                })
            }
            <TouchableOpacity onPress={onTouch}>
                    <Animated.Image
                        ref={imgRef}
                        source={imgSrc||{
                            uri: 'https://via.placeholder.com/150',
                        }}
                        style={[{                            
                            width: imgSpec?.width *zoomLevel|| 0,
                            height: imgSpec?.height*zoomLevel || 0,
                            // width: imgSpec?.width|| 0,
                            // height: imgSpec?.height || 0,                                                        
                        },
                        // getTransform()
                    ]}
                        resizeMode="stretch"

                    />
            </TouchableOpacity>
        </ScrollView>
    )
}

const fourEdge=(imgSpec)=>[
    {
        id:0,
        x:0,
        y:0,
    },
    {
        id:1,
        x:imgSpec.width,
        y:imgSpec.height,
    },
    {
        id:2,
        x:imgSpec.width,
        y:0,
    },
    {
        id:3,
        x:0,
        y:imgSpec.height,
    },
    {
        id:4,
        x:0,
        y:imgSpec.height,
    },
]
const randomPins=(imgSpec)=>generateRandomPin(imgSpec,100)