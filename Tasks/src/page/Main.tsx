import React, { Component } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import { Text } from 'react-native-paper';

import { createStore } from 'redux'

import todoList from './list/List';
import ajaxList from './ajax/List';

import { Title, Button, FAB, List } from 'react-native-paper';

import Logotype from './element/Logotype'
import Figures from './element/Figures'

type Action = {
    type:string,
    value:string
}

function reducer(state:todoList[], action:Action):todoList[] {
    switch (action.type) {
        case 'init':
            return todoList.getLists(action.value);
        default:
            return state
    }
}

var store = createStore( reducer, [] );

interface ShowChecked {
    [key: number]: boolean;
 } 

type MainStates = {
    texts: todoList[],
    showCheked: ShowChecked
}

class Main extends Component<null,MainStates>{

    constructor(props:any) {
        super(props);
    
        this.state = {
            texts: [],
            showCheked: {}
        }

        store.subscribe(this.updateState);

        this.getList();
    }

    updateState = () => {
        this.setState({texts: store.getState()});        
    }

    getList(){
        ajaxList.getLists((value:string)=>{
            console.log( "ajaxList.getLists()" );
            store.dispatch({ type: 'init', value: value })
        });
    }

    todoCheck(listIndex:number, todoIndex:number){
        const state = store.getState();

        let list = state[listIndex];
        let listId = list.id;
        let todo = list.getTodo( todoIndex );
        let todoId = todo.id;
        let todoCheck = todo.checked;

        ajaxList.editTodo(listId, todoId, { checked: !todoCheck }, (value:string)=>{
            console.log( "ajaxList.editTodo()" );
            this.getList();
        });
    }

    render() {

        console.log('Rendered')

        var list = [];

        const state = store.getState()

        for(let i = 0; i<state.length; i++){
            var todoChecked = [];
            var todoUnChecked = [];
            for(let j=0; j < state[i].getTodoCount(); j++){
                let checked = state[i].getTodo(j).checked;
                let item = <List.Item
                        style={styles.item}
                        titleStyle={{ textDecorationLine: checked ? "line-through" : "none" }}
                        key={"item_"+i+"_"+j}
                        title={state[i].getTodo(j).text}
                        left={() => <List.Icon color={checked ? "#1879FE" : "black" } icon = { checked ? "check" : "circle-outline"} />}
                        onPress={()=>this.todoCheck(i,j)}
                    />;
                if(checked){
                    todoChecked.push(item);
                }else{
                    todoUnChecked.push(item);
                }
            }

            let listId:number = state[i].id;
            let check:boolean = this.state.showCheked[listId] || false;

            if(check==false){
                todoChecked = [];
            }

            todoUnChecked.push(
                <List.Item
                    style={styles.item}
                    key={"split_"+i}
                    title="Завершенные"
                    left={() => <List.Icon icon={ check==true ? "chevron-up":"chevron-down" } />}
                    onPress={
                        ()=> { 
                            var data = this.state.showCheked;
                            data[listId] = data[listId]==true ? false: true;
                            this.setState({showCheked: data});
                        }
                    }
                />
            );

            list.push(
                <List.Section  key={"section_"+i}>
                    <List.Subheader  key={"subheader_"+i} style={{textTransform: 'uppercase'}}>{state[i].title}</List.Subheader>
                    {todoUnChecked}
                    {todoChecked}
                </List.Section>
            )
        }

        return (
            <View style={styles.container}>

                <View style={styles.logo}>
                    <Logotype/>
                </View>

                <List.Item style={{height:20}} titleStyle={{fontSize:20}} title="Задачи" left={() => <List.Icon icon="circle-outline" color="white" />} />

                <View style={styles.bar}>
                    <View style={{position:"relative", left:48, top:3}}><Figures/></View>
                    <Button mode="text" style={{width:0}} onPress={() => console.log('Pressed')} color="black"><></></Button>
                </View>

                <ScrollView>
                    {list}
                </ScrollView>

            </View>                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-end"
    },
    item:{
        height:50,
        justifyContent: 'center'
    },
    bar:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        top: -5
    },
    logo:{
        alignItems:"flex-end",
        marginRight: 7
    },
  })

export default Main;