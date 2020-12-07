import React, { Component } from 'react';

import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { createStore } from 'redux'

import todoList from './list/List';
import ajaxList from './ajax/List';

import { Button, FAB, List, Modal } from 'react-native-paper';

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
    selectedListIndex:number,
    showModal:boolean,
}

class Main extends Component<null,MainStates>{

    constructor(props:any) {
        super(props);

        this.state = {
            lists: [],
            showCheked: {},
            selectedListIndex: -1,
            showModal: false,
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

    createList(){
        ajaxList.createList({title:"Новый список"},(value:string)=>{
            console.log( "ajaxList.createList()" );
            this.getList();
        });
    }

    renameList(id:number, name:string){
        ajaxList.editList(id,{title:name},(value:string)=>{
            console.log( "ajaxList.editList()" );
            this.getList();
        });
    }

    removeList(id:number){
        ajaxList.removeList(id,(value:string)=>{
            console.log( "ajaxList.removeList()" );
            this.getList();
        });
    }

    createTodo(listId: number){
        ajaxList.createTodo(listId, {text:"Новая задача"},(value:string)=>{
            console.log( "ajaxList.createTodo()" );
            this.getList();
        });
    }

    renameTodo(listId: number, todoId: number, name:string){
        ajaxList.editTodo(listId, todoId, {text:name}, (value:string)=>{
            console.log( "ajaxList.editTodo()" );
            this.getList();
        });
    }

    removeTodo(listId: number, todoId: number){
        ajaxList.removeTodo(listId, todoId,(value:string)=>{
            console.log( "ajaxList.removeTodo()" );
            this.getList();
        });
    }

    render() {

        var list = [];
        var modalList = [];

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

            modalList.push(
                <List.Item
                    key={"modalItem_"+i}
                    style={styles.item} 
                    title={state[i].title}
                    right={() => <List.Icon color="red" icon="trash-can-outline" />}
                    onPress={
                        ()=>{
                            this.removeList(listId);
                        }
                    }
                />
            );
        }

        return (
            <View style={styles.container}>

                <View style={styles.logo}>
                    <Logotype/>
                </View>

                <List.Section>
                    <List.Item style={{height:20}} titleStyle={{fontSize:20}} title="Задачи" left={() => <List.Icon icon="circle-outline" color="white" />} />
                </List.Section>

                
                    <View style={styles.bar}>
                        <IF condition={!this.state.showModal}>
                            <View style={{position:"relative", left:48, top:3}}><Figures/></View>
                        </IF>
                        <Button mode="text" style={{width:0}} onPress={() => this.setState({showModal:true}) } color="black"><></></Button>
                    </View>
                

                <ScrollView>
                    {list}
                </ScrollView>

                <IF condition={this.state.lists[this.state.selectedListIndex]!=null}>
                    <IF condition={!this.state.showModal}>
                        <FAB style={styles.fab} small icon="plus" color="white" onPress={() => this.createTodo(this.state.lists[this.state.selectedListIndex].id) } />
                    </IF>
                </IF>

                <IF condition={this.state.showModal}>
                    <Modal visible={true} onDismiss={()=> this.setState({showModal:false}) }  contentContainerStyle={styles.modal}>
                        <ScrollView>
                            {modalList}
                        </ScrollView>
                        <List.Item style={styles.item}  title="Новая категория" onPress={() => this.createList() } right={() => <List.Icon color="gray" icon="plus" />} />
                    </Modal>
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
        justifyContent: 'center',
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
    },
    modal:{
        position: 'absolute',
        bottom:0,
        height:250,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
  })

export default Main;