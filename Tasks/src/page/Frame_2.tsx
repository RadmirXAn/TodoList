import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Button, List, TextInput } from 'react-native-paper';

import Logotype from './element/Logotype'
import Figures from './element/Figures'

class Frame_2 extends Component{

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>

                <View style={styles.logo}>
                    <Logotype/>
                </View>

                <View style={styles.bar}>
                    <Button style={{width:0}} onPress={() => console.log('Pressed')} color="black" icon="arrow-left"><></></Button>
                    <View style={{flexDirection: 'row', flex: 1}}></View>
                    <Button style={{width:0}} onPress={() => console.log('Pressed')} color="black" icon="check"><></></Button>
                </View>

                <TextInput label="Название задачи" />

                <ScrollView>

                    <List.Section>
                        <List.Subheader>КАТЕГОРИЯ</List.Subheader>
                        <List.Item style={styles.item} title="Семья" right={() => <List.Icon icon="circle-outline" />} />
                        <List.Item style={styles.item} title="Работа" right={() => <List.Icon  color="#1879FE" icon="radiobox-marked" />} />
                        <List.Item style={styles.item} title="Прочее" right={() => <List.Icon icon="circle-outline" />} />
                        </List.Section>

                </ScrollView>

            </View>
        );
      }
}

const styles = StyleSheet.create({
    logo:{
        alignItems:"flex-end",
        marginRight: 7
    },
    item:{
        height:50
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

export default Frame_2;