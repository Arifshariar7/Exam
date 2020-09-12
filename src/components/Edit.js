import React ,{useState,useEffect} from 'react'
import { ActivityIndicator,StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList, Keyboard,Image,Button } from 'react-native'
import {firebase} from '../firebase/config'

export default function Edit({route,navigate}) {
    const entityRef = firebase.firestore().collection('entities')
    const item=route.params.item;
    const [entityText, setEntityText] = useState(item.text)
    const [loading, setLoading] = useState(false)

    const onUpdateButtonPress = () => {
        if (entityText && entityText.length > 0) {
            setLoading(true)
            return entityRef.doc(item.id).update({text:entityText}).then(()=>{
            setLoading(false);
            
            }
            ).catch(err=>{
                alert(err);
                setLoading(false);
            }
            )
        }
        return alert("your Note is empty");    }






    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Edit Note</Text>
                </View>
                <TextInput
                    onChangeText={text => setEntityText(text)}
                    value={entityText}
                    placeholder="Write down your notes"
                    style={styles.input}
                     />
                     {loading ?(<ActivityIndicator style={{marginTop:25}}/>):(
                         <Button
                            title="update"
                            backgroundColor="blue"
                            onPress={onUpdateButtonPress}
                            
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
