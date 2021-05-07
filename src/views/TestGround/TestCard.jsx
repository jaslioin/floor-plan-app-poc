import React from 'react';
import { StyleSheet, View, Animated, ViewProps, Text, RotateXTransform, RotateYTransform,
   PerpectiveTransform, RotateTransform, RotateZTransform, ScaleTransform, 
   ScaleXTransform, ScaleYTransform, TranslateXTransform, TranslateYTransform, 
   SkewXTransform, SkewYTransform } from 'react-native';
import { withAnchorPoint, Point, Size } from 'react-native-anchor-point';



const CARD_WIDTH = 200; 
const CARD_HEIGHT = 200;

export default class TestCard extends React.Component{
    getTransform(){
        // why perspective: 400 useless when put it at last  
        let transformValues= [{ perspective: 400 }];

        if (this.props.rotateX) {
          transformValues.push({rotateX: this.props.rotateX})
        }

        if (this.props.rotateY) {
          transformValues.push({rotateY: this.props.rotateY})
        }

        if (this.props.rotateZ) {
          transformValues.push({rotateZ: this.props.rotateZ})
        }

        let transform = {
            transform: transformValues,
        };
        return withAnchorPoint(transform, this.props.anchorPoint, { width: CARD_WIDTH, height: CARD_HEIGHT });
      }

    render() {
       const {anchorPoint} = this.props; 
       const top = anchorPoint.y * CARD_HEIGHT;
       const left = anchorPoint.x * CARD_WIDTH;

        return (
            <View style={styles.background}>
                <Animated.View style={[styles.blockBlue, this.getTransform()]} />
                <View style={[styles.anchorPoint, { left, top }]} />
                <Text style={[styles.text]}>   (x: {anchorPoint.x}, y: {anchorPoint.y}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        margin: 50,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#a6abaa',
    },
    anchorPoint: {
        width: 8,
        height: 8,
        backgroundColor: '#cc3b92',
        position: 'absolute',
    },
    blockBlue: {
        flex: 1,
        backgroundColor: '#03fcd3',
    },
    text: {
        position: 'absolute',
        left: 80,
        top: 80,
        color: '#bd488b',
    },
});
