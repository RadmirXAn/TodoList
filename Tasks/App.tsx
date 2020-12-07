import React from "react";

import { StyleSheet, SafeAreaView, View } from 'react-native';

import Frame_1 from './src/page/Frame_1'
import Frame_2 from './src/page/Frame_2'
import Frame_3 from './src/page/Frame_3'
import Test from './src/page/Test'
import RequestTest from './src/page/RequestTest'

export default function App() {
  return (
    
    <SafeAreaView  style={styles.container}>
      <View style={styles.container}>
        <RequestTest />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
