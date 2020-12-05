import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

class Figures extends Component{
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.triangle}>△</Text>
            <Text style={styles.rectangle}>□</Text>
            <Text style={styles.circle}>○</Text>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    rectangle: {
        position: 'relative',
        fontWeight: "bold",
        fontSize: 18,
        top: 10,
    },
    circle: {
        position: 'relative',
        fontWeight: "bold",
        fontSize: 25,
        top: 5.5,
      },
    triangle: {
        position: 'relative',
        fontWeight: "bold",
        fontSize: 15,
        top: -1,
        left: 17,
    },
  });

export default Figures;