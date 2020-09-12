import React ,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList, Keyboard,Image } from 'react-native'
import { Directions } from 'react-native-gesture-handler'
import {firebase} from '../firebase/config'
import {AntDesign,Feather} from '@expo/vector-icons'
import Card from './Card'

export default function Home(props) {

    const [entities, setEntities] = useState([])
    const { navigate } = props.navigation;
    const userID = props.extraData.id
     const entityRef = firebase.firestore().collection('entities')


    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    alert(error)
                    console.log(error)
                }

            )
    }, [])



    const onDelete=(id)=>{
        
        return entityRef.doc(id).delete();

    }
    
    const renderEntity = ({item, index}) => {
        return (
            <Card customStyle={{padding:20,marginBottom:15}}>
                <TouchableOpacity style={[styles.titleWrapper,{flex:1}]}>
                    <View style={{flexDirection:"row",flex:1,flexWrap:'wrap'}}>

                        <Text>`Note #{index+1} - `</Text>
                        <Text>{item.text}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={()=>navigate('Edit',{item})}> 
                        <Feather name="edit" size={24} color="black"></Feather>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onDelete(item.id)}>
                        <AntDesign name="delete" size={24} style={{marginLeft:15}}color="black"></AntDesign>
                        </TouchableOpacity>
                    </View>


                </TouchableOpacity>
                
            </Card>        
            )
    }

    return (
        <View style={styles.container}>
            
            
          <View style={styles.wrapper}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>My TODO'S</Text>
                <TouchableOpacity onPress={()=>{
                    navigate('Create',{userID:userID})
                }}>
                <Image source={require('../../assets/plus.png')}/>
                </TouchableOpacity>
                </View>
          </View>

          {(!entities || entities.length==0) ? 
              <View>
              <Image source={require('../../assets/empty.png')}/>
                <Text style={{textAlign:'center' ,paddingTop:20,textSize:18}}>Sorry you do not have tasks</Text>
          </View>
          :<View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />


            
                </View>

          
          }
            

            


        </View>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        margin:25,
    },
    container: {
        flex: 1,
        backgroundColor:"white"
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
    
    logOutButton:{  
        backgroundColor: 'red',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        width:250,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },

})
