import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

export default function Card({children,customStyle}) {
    return (
        <View style={[styles.wrapper,customStyle]}>
        {children}
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper:{
        // borderWidth:1,
        // borderColor:"#ddd",
        borderRadius:12,
        backgroundColor:"white",
        borderColor:'orange',
        //android
        elevation:2,
        //ios
        shadowColor:'black',
        shadowOffset:{
            height:4,
            width:0
        },
        shadowOpacity:0.2,
        shadowRadius:2,
        borderWidth:1




    }

})
