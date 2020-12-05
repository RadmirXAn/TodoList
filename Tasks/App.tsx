import React from "react";

import { StyleSheet, StatusBar, View } from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

//---

import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos, ['Use Redux'])

//---


import Frame_1 from './src/page/Frame_1'
import Frame_2 from './src/page/Frame_2'

export default function App() {
  return (
    
      <StoreProvider store={store}>
        <PaperProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Frame_2 />
          </View>
        </PaperProvider>
      </StoreProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
