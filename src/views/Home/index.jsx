import React from 'react';
import { useRef } from 'react';
import { useEffect ,useState,useMemo} from 'react';
import { View ,Text, Dimensions, Image, ScrollView, TouchableOpacity, Button, TouchableHighlight} from 'react-native';
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

function Pin({id=null,x=0,y=0,onPress}){
    useEffect(()=>{
        // console.log(x,y);
    },[x,y])
    return(
        <View
            style={{
                position:'absolute',
                zIndex:Z_INDEX_CONFIG.HIGHEST,
            }}
        >
            <Text style={{
                color:'red',
                backgroundColor:'white',
                top:y-75+IMAGE_OFFSET.y,
                left:x+IMAGE_OFFSET.x,
                position:'absolute',
                textAlign:'center',
                width:100,
            }}>
                {id}:({x},{y})
            </Text>
            <TouchableOpacity onPress={onPress} 
                style={{
                    top:y-50 +IMAGE_OFFSET.y,
                    left:x-25 +IMAGE_OFFSET.x,
                    // backgroundColor:'red',
                    width:50,
                    height:50,
                }}
            >
                <View>
                    <Image 
                        source={pinSrc}
                        style={{
                            width:50,
                            height:50,
                        }}
                        resizeMode='contain'
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
}
export default function Home ({zoomLevel=1}){
    const imgRef=useRef();
    const [imgSrc,setSrc]=useState()
    const [imgSpec,setImgSpec]=useState({})
    const [pinList,setPinList]=useState([])
    const demoPins=useRef([])
    useEffect(()=>{
        setSrc(require('../../assets/img/2.png'))
    },[])

    useEffect(()=>{
        console.log('imgSrc');
        if(!imgSrc){
            return
        }
        console.log(Image.resolveAssetSource(imgSrc));
        setImgSpec(Image.resolveAssetSource(imgSrc))
    },[imgSrc])
    useEffect(()=>{
        console.log('imgSpec');
        console.log(imgSpec);
        if(!imgSpec || Object.keys(imgSpec).length===0){
            return
        }
        if(demoPins.current.length===0){
            demoPins.current=randomPins(imgSpec,10)
        }
        // const pins=generateRandomPin({
        //     ...imgSpec,
        //     width:imgSpec.width*zoomLevel,
        //     height:imgSpec.height*zoomLevel
        // },10)
        // const pins=fourEdge({
        //     ...imgSpec,
        //     width:imgSpec.width*zoomLevel,
        //     height:imgSpec.height*zoomLevel
        // })
        const pins=demoPins.current.map(pin=>({
            ...pin,
            x:pin.x*zoomLevel,
            y:pin.y*zoomLevel,
        }))
        console.log(pins);
        setPinList(pins)
    },[imgSpec,zoomLevel])

    const pinRenderer=(()=>{
        return pinList.map((pin)=>{
            return <Pin key={pin.id} id={pin.id} x={pin.x} y={pin.y} onPress={()=>{handlePinPress(pin)}}/>
        })
    })()
    /** DEV FUNCTION */
    function changeImage(){
        const randomIndex=Math.round(Number(Math.random()*(sources.length-1).toFixed(0)))
        console.log('index',randomIndex);
        setSrc((sources[randomIndex]))
    }
    function onTouch(event){
        console.log('Screen:',Dimensions.get('screen'));
        console.log('Window:',Dimensions.get('window'));
        console.log(event.nativeEvent.locationX,event.nativeEvent.locationY);
        console.log(imgSpec);
        // console.log(imgRef.current);
    }
    function handlePinPress(pinObj){
        console.log("PRESSED",pinObj);
    }
    return(
        <ScrollView style={{
            backgroundColor:'pink',
            height:'100%',
        }}
        >
            <View style={{position:'absolute',zIndex:1000,top:300,left:100}}>
                <Button title="CHANGE" onPress={changeImage}/>
            </View>
            {pinRenderer}
            <TouchableOpacity onPress={onTouch}>
                <View style={{
                    marginHorizontal:IMAGE_OFFSET.x,
                    marginVertical:IMAGE_OFFSET.y
                }}>
                    <Image 
                        ref={imgRef}
                        source={imgSrc||{
                            uri: 'https://via.placeholder.com/150',
                        }}
                        style={{
                            
                            // height: imgSpec.height,
                            width:imgSpec.width * zoomLevel|| 0,
                            height: imgSpec.height *zoomLevel || 0,
                        }}
                        // resizeMethod="auto"
                        resizeMode="stretch"
                    />
                </View>
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
const randomPins=(imgSpec)=>generateRandomPin(imgSpec,10)