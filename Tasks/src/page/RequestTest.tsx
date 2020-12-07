import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Text } from 'react-native-paper';

import { createStore } from 'redux'

import List from './list/List';

let jsonText:string = '[{"id":4,"title":"Семья","candidate_id":2,"created_at":"2020-07-10T13:05:07.801Z","updated_at":"2020-07-10T13:05:07.801Z","todos":[{"id":9,"text":"Купить молоко","list_id":4,"checked":false,"created_at":"2020-07-10T13:05:07.822Z","updated_at":"2020-07-10T13:05:07.822Z"},{"id":10,"text":"Постирать вещи","list_id":4,"checked":false,"created_at":"2020-07-10T13:05:07.826Z","updated_at":"2020-07-10T13:05:07.826Z"},{"id":11,"text":"Убрать комнату","list_id":4,"checked":true,"created_at":"2020-07-10T13:05:07.828Z","updated_at":"2020-07-10T13:05:07.828Z"}]},{"id":5,"title":"Работа","candidate_id":2,"created_at":"2020-07-10T13:05:07.832Z","updated_at":"2020-07-10T13:05:07.832Z","todos":[{"id":12,"text":"Заполнить отчет","list_id":5,"checked":false,"created_at":"2020-07-10T13:05:07.836Z","updated_at":"2020-07-10T13:05:07.836Z"},{"id":13,"text":"Отправить документы","list_id":5,"checked":false,"created_at":"2020-07-10T13:05:07.838Z","updated_at":"2020-07-10T13:05:07.838Z"},{"id":14,"text":"Позвонить заказчику","list_id":5,"checked":true,"created_at":"2020-07-10T13:05:07.841Z","updated_at":"2020-07-10T13:05:07.841Z"}]},{"id":6,"title":"Прочее","candidate_id":2,"created_at":"2020-07-10T13:05:07.843Z","updated_at":"2020-07-10T13:05:07.843Z","todos":[{"id":15,"text":"Позвонить к другу","list_id":6,"checked":false,"created_at":"2020-07-10T13:05:07.847Z","updated_at":"2020-07-10T13:05:07.847Z"},{"id":16,"text":"Подготовиться к поездке","list_id":6,"checked":false,"created_at":"2020-07-10T13:05:07.849Z","updated_at":"2020-07-10T13:05:07.849Z"}]},{"id":7,"title":null,"candidate_id":2,"created_at":"2020-07-12T14:08:44.220Z","updated_at":"2020-07-12T14:08:44.220Z","todos":[]}]';

let lists:List[] = List.getLists(jsonText);

console.log( lists.length, lists[0].getTodoCount(), lists[0].getTodo(0) );

type Action = {
    type:String,
    value:String
}

function reducer(state:String[], action:Action):String[] {
    switch (action.type) {
        case 'add':
            return state.concat(action.value);
        case 'remove':
            state.pop()
            return state;
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

        store.subscribe(this.update)
    }

    update = () => {
        this.setState({texts: store.getState()});        
    }

    add(){
        console.log('Add')
        store.dispatch({ type: 'add', value: 'Test_'+(Math.random()*5) })
    }

    remove(){
        console.log('Remove')
        store.dispatch( { type: 'remove', value:"" } )
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
                <Text key={"key_"+i}>{state[i]}</Text>
            );
        }

        return (
            <View style={styles.container}>
                {texts}
                <Text>{state.length}</Text>
                <Button onPress={() =>this.add()}>Add</Button>
                <Button onPress={() =>this.remove()}>Remove</Button>
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