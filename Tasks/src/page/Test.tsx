import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Text } from 'react-native-paper';

import { createStore } from 'redux'

type Action = {
    type:String,
    value:String
}

function reducer(state:any, action:Action):String[] {
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

class Test extends Component{

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

export default Test;