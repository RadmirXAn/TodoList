import React from "react";

import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';

import Main from './src/page/Main'

export default function App() {
  return (
    <>
    <StatusBar backgroundColor="black" barStyle="default" />
    <SafeAreaView  style={styles.container}>
      <View style={styles.container}>
        <Main />
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
