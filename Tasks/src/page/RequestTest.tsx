import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Text } from 'react-native-paper';

import { createStore } from 'redux'

import List from './list/List';

import ajaxList from './ajax/List';

type Action = {
    type:string,
    value:string
}

function reducer(state:List[], action:Action):List[] {
    switch (action.type) {
        case 'init':
            return List.getLists(action.value);
        default:
            return state
    }
}

var store = createStore( reducer, [] );

class RequestTest extends Component{

    constructor(props:any) {
        super(props);
    
        this.state = {
            texts: []
        }

        store.subscribe(this.updateState);

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

    createList(){
        ajaxList.createList({title:"Новый список"},(value:string)=>{
            console.log( "ajaxList.createList()" );
            this.getList();
        });
    }

    removeList(){
        const state = store.getState();

        if(state.length==0)return;

        ajaxList.removeList(state[state.length-1].id,(value:string)=>{
            console.log( "ajaxList.removeList()" );
            this.getList();
        });
    }

    renameList(){
        const state = store.getState();

        if(state.length==0)return;

        ajaxList.editList(state[state.length-1].id,{title:"New List Name"},(value:string)=>{
            console.log( "ajaxList.editList()" );
            this.getList();
        });
    }

    createTodo(){
        const state = store.getState();

        if(state.length==0)return;

        ajaxList.createTodo(state[state.length-1].id, {text:"Новая задача"},(value:string)=>{
            console.log( "ajaxList.createTodo()" );
            this.getList();
        });
    }

    renameTodo(){
        const state = store.getState();

        if(state.length==0)return;

        let list = state[state.length-1];
        let listId = list.id;
        let todoId = list.getTodo( list.getTodoCount() - 1 ).id;

        ajaxList.editTodo(listId, todoId, {text:"New Todo Name"}, (value:string)=>{
            console.log( "ajaxList.editTodo()" );
            this.getList();
        });
    }

    removeTodo(){
        const state = store.getState();

        if(state.length==0)return;

        let list = state[state.length-1];
        let listId = list.id;
        let todoId = list.getTodo( list.getTodoCount() - 1 ).id;

        ajaxList.removeTodo(listId, todoId,(value:string)=>{
            console.log( "ajaxList.removeTodo()" );
            this.getList();
        });
    }

    facke(){
        console.log('Facke')
        store.dispatch( { type: 'facke', value:"" } )
    }

    render() {

        console.log('Rendered')

        var texts = [];

        const state = store.getState()

        for(var i = 0; i<state.length; i++){
            texts.push(
                <Text key={"key_"+i}>{state[i].title}</Text>
            );
            for(var j=0; j < state[i].getTodoCount(); j++){
                texts.push(
                    <Text key={"key_"+i+"_"+j}>    {state[i].getTodo(j).text}</Text>
                );
            }
        }

        return (
            <View style={styles.container}>
                {texts}
                <Text>{state.length}</Text>
                <Button onPress={() =>this.getList()}>Update</Button>
                <Button onPress={() =>this.createList()}>Create List</Button>
                <Button onPress={() =>this.renameList()}>Rename List</Button>                
                <Button onPress={() =>this.removeList()}>Remove List</Button>
                <Button onPress={() =>this.createTodo()}>Crate Todo</Button>
                <Button onPress={() =>this.renameTodo()}>Rename Todo</Button>
                <Button onPress={() =>this.removeTodo()}>Remove Todo</Button>
                <Button onPress={() =>this.facke()}>Facke</Button>
            </View>                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-end",
      },
  })

export default RequestTest;