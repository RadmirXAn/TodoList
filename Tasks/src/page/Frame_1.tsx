import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Title, Button, FAB, List } from 'react-native-paper';

import Logotype from './element/Logotype'
import Figures from './element/Figures'

class Frame_1 extends Component{
    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>

                <View style={styles.logo}>
                    <Logotype/>
                </View>

                <View style={styles.bar}>
                    <View style={styles.preRow}></View>
                    <View style={{flexDirection: 'row', flex: 1}}><Title>Задачи</Title></View>
                    <View style={{position:"relative", left:48, top:3}}><Figures/></View>
                    <Button mode="text" style={{width:0}} onPress={() => console.log('Pressed')} color="black"><></></Button>
                </View>

                <ScrollView>

                    <List.Section>
                        <List.Subheader>Семья</List.Subheader>
                        <List.Item title="Купить продукты" left={() => <List.Icon icon="circle-outline" />} />
                        <List.Item title="Запонить счет" left={() => <List.Icon color="#1879FE" icon="check" />} />
                        <List.Item title="Завершенные" left={() => <List.Icon icon="chevron-down" />} />
                        <List.Item title="Завершенные" left={() => <List.Icon icon="chevron-up" />} onPress={() => console.log('Pressed')} />
                        <List.Item title="Редактировать / Удалить" left={() => <List.Icon icon="pencil-outline" />} right={() => <List.Icon color="red" icon="trash-can-outline" />} />
                        </List.Section>

                </ScrollView>

                <View style={{height: 50, backgroundColor: 'skyblue'}} />

                <FAB style={styles.fab} small icon="plus" color="white" onPress={() => console.log('Pressed')} />

            </View>
        );
      }
}

const styles = StyleSheet.create({
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

export default Frame_1;