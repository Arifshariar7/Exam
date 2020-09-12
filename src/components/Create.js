import React ,{useState,useEffect} from 'react'
import { ActivityIndicator,StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList, Keyboard,Image,Button } from 'react-native'
import {firebase} from '../firebase/config'

export default function Create({route,navigate}) {
    const [entityText, setEntityText] = useState('')
    const [loading, setLoading] = useState(false)
    const entityRef = firebase.firestore().collection('entities')
    const {userID} = route.params;

    const onSaveButtonPress = () => {
        if (entityText && entityText.length > 0) {
            setLoading(true)
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            return entityRef
                .add(data)
                .then(_doc => {
                   
                    setEntityText('')
                    Keyboard.dismiss()
                    setLoading(false);
                })
                .catch((error) => {
                    alert(error)
                    setLoading(false)
                });
        }
        return alert("your Note is empty");

    }






    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Create Note</Text>
                </View>
                <TextInput
                    onChangeText={text => setEntityText(text)}
                    value={entityText}
                    placeholder="Write down your notes"
                    style={styles.input}
                     />
                     {loading ?(<ActivityIndicator style={{marginTop:25}}/>):(
                         <Button
                            title="save"
                            backgroundColor="blue"
                            onPress={onSaveButtonPress}
                            
                            >
                     </Button>)}
            </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
    wrapper:{
        margin:25,
    },
    container: {
        flex: 1,
    },
    titleWrapper:{
        justifyContent:"space-between",
        flexDirection:'row',
        alignItems:'center'

    }  ,
    title:{
        fontSize:20,
        fontWeight:'bold'
    }, 
    input:{
        height:60,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginTop:40

    } 
    
})
