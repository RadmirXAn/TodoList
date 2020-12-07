import React, { Component } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import { createStore } from 'redux'

import todoList from './list/List';
import ajaxList from './ajax/List';

import { Button, FAB, List } from 'react-native-paper';

import Logotype from './element/Logotype';
import Figures from './element/Figures';
import IF from './element/IF';;

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
    lists: todoList[],
    showCheked: ShowChecked,
    selectedListIndex:number
}

class Main extends Component<null,MainStates>{

    constructor(props:any) {
        super(props);
    
        this.state = {
            lists: [],
            showCheked: {},
            selectedListIndex: -1
        }

        store.subscribe(this.updateState);

        this.getList();
    }

    updateState = () => {
        this.setState({lists: store.getState()});        
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

    createTodo(listId: number){
        ajaxList.createTodo(listId,(value:string)=>{
            console.log( "ajaxList.createTodo()" );
            this.getList();
        });
    }

    createList(){
        ajaxList.createList((value:string)=>{
            console.log( "ajaxList.createList()" );
            this.getList();
        });
    }

    render() {

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
                        onPress={ ()=> {
                            this.todoCheck(i,j); this.setState({selectedListIndex:i});
                            }
                        }
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
                            this.setState({showCheked: data, selectedListIndex:i});
                        }
                    }
                />
            );

            list.push(
                <List.Section  key={"section_"+i}>
                    <List.Subheader
                        key={"subheader_"+i}
                        style={this.state.selectedListIndex==i ? styles.selectedList : styles.unselectedList}
                        onPress={()=>this.setState({selectedListIndex:i})}
                    >{state[i].title}</List.Subheader>
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
                    <Button mode="text" style={{width:0}} onPress={() => this.createList() } color="black"><></></Button>
                </View>

                <ScrollView>
                    {list}
                </ScrollView>

                <IF condition={this.state.lists[this.state.selectedListIndex]!=null}>
                    <FAB style={styles.fab} small icon="plus" color="white" onPress={() => this.createTodo(this.state.lists[this.state.selectedListIndex].id) } />
                </IF>

            </View>                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
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
        alignItems:'flex-end',
        marginRight: 7
    },
    selectedList:{
        textTransform: 'uppercase',
        backgroundColor: 'gray',
        color: 'white'
    },
    unselectedList:{
        textTransform: 'uppercase',
        backgroundColor: 'white',
        color: 'black'
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

export default Main;