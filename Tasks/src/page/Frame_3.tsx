import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

import { TextInput , Title, Button, FAB, List, Modal, Portal } from 'react-native-paper';

import Logotype from './element/Logotype'
import Figures from './element/Figures'

import IF from './element/IF';

class Frame_3 extends Component{

    state = { showModal: false };

    render() {
        var data = [];
        if(this.state.showModal){

        }else{
            data.push(
                <FAB style={styles.fab} small icon="plus" color="white" onPress={() => this.setState({ showModal: true }) } />
            );            
        }

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} >
                <View style={{flexDirection: 'column', flex: 1, justifyContent: "flex-end"}}>

                    <IF condition={this.state.showModal == false}>
                        <FAB style={styles.fab} small icon="plus" color="white" onPress={() => this.setState({ showModal: true }) } />
                    </IF>

                    <IF condition={this.state.showModal}>
                        <View style={styles.splash}></View>
                        <View style={styles.moadal}>
                            <ScrollView>

                                <List.Section>
                                    <List.Item style={styles.item}  title="Удалить" right={() => <List.Icon color="red" icon="trash-can-outline" />} />
                                    <List.Item style={styles.item}  title="Удалить" right={() => <List.Icon color="red" icon="trash-can-outline" />} />
                                    <List.Item style={styles.item}  title="Удалить" right={() => <List.Icon color="red" icon="trash-can-outline" />} />
                                </List.Section>

                            <View style={{flexDirection: 'row', flex: 1}}>
                                <TextInput label="Новая категория" style={{flex:1, justifyContent: "center"}}/>
                                <Button onPress={() => console.log('Pressed')} color="black" icon="plus"><></></Button>
                            </View>

                            </ScrollView>
                        </View>
                    </IF>

                </View>
            </KeyboardAvoidingView>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    moadal:{
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 200,
    },
    item:{
        height:40
    },
    splash:{
        backgroundColor: "black",
        opacity: 0.8,
        position: "absolute",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    logo:{
        alignItems:"flex-end",
        marginRight: 7
    },
    preRow:{
        width: 67,
        height: 0,
        backgroundColor: 'skyblue',
    },
    bar:{
        flexDirection: 'row', 
        margin: 7, 
        justifyContent: 'center'
    },
    fab: {
      position: 'absolute',
      padding: 7,
      margin: 14,
      right: 0,
      bottom: 0,
      backgroundColor: '#1879FE',
    }
  })

export default Frame_3;